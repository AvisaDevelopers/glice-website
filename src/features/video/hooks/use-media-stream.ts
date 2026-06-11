"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type MediaStatus =
  | "checking"
  | "idle"
  | "requesting"
  | "ready"
  | "denied"
  | "error";

const MEDIA_CONSTRAINTS: MediaStreamConstraints = {
  video: {
    facingMode: "user",
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
  audio: true,
};

let sharedStream: MediaStream | null = null;

function hasLiveTracks(stream: MediaStream | null) {
  if (!stream?.active) return false;
  const video = stream.getVideoTracks().some((t) => t.readyState === "live");
  const audio = stream.getAudioTracks().some((t) => t.readyState === "live");
  return video && audio;
}

function bindStream(video: HTMLVideoElement | null, stream: MediaStream | null) {
  if (!video) return;
  video.srcObject = stream;
  if (stream) {
    void video.play().catch(() => {
      /* autoplay policy */
    });
  }
}

function clearSharedStream() {
  sharedStream?.getTracks().forEach((track) => track.stop());
  sharedStream = null;
}

async function queryPermissionStates(): Promise<{
  camera: PermissionState | "unknown";
  microphone: PermissionState | "unknown";
}> {
  if (!navigator.permissions?.query) {
    return { camera: "unknown", microphone: "unknown" };
  }

  try {
    const [camera, microphone] = await Promise.all([
      navigator.permissions.query({ name: "camera" as PermissionName }),
      navigator.permissions.query({ name: "microphone" as PermissionName }),
    ]);
    return { camera: camera.state, microphone: microphone.state };
  } catch {
    return { camera: "unknown", microphone: "unknown" };
  }
}

async function acquireMediaStream() {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("unsupported");
  }
  return navigator.mediaDevices.getUserMedia(MEDIA_CONSTRAINTS);
}

async function tryAcquireStream(): Promise<MediaStream | null> {
  try {
    return await acquireMediaStream();
  } catch {
    return null;
  }
}

export function useMediaStream() {
  const localRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(sharedStream);
  const [status, setStatus] = useState<MediaStatus>("checking");
  const [cameraEnabled, setCameraEnabledState] = useState(true);
  const probeStartedRef = useRef(false);

  const syncVideo = useCallback(() => {
    bindStream(localRef.current, streamRef.current);
  }, []);

  const applyStream = useCallback(
    (stream: MediaStream) => {
      sharedStream = stream;
      streamRef.current = stream;
      syncVideo();
      setCameraEnabledState(true);
      setStatus("ready");
    },
    [syncVideo],
  );

  const attachSharedStream = useCallback(() => {
    if (!hasLiveTracks(sharedStream)) return false;
    streamRef.current = sharedStream;
    syncVideo();
    setStatus("ready");
    return true;
  }, [syncVideo]);

  const stopStream = useCallback(() => {
    clearSharedStream();
    streamRef.current = null;
    bindStream(localRef.current, null);
    setCameraEnabledState(true);
    setStatus("idle");
  }, []);

  const requestAccess = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("error");
      return;
    }

    if (attachSharedStream()) return;

    setStatus("requesting");

    if (sharedStream && !hasLiveTracks(sharedStream)) {
      clearSharedStream();
      streamRef.current = null;
    }

    const stream = await tryAcquireStream();
    if (stream) {
      applyStream(stream);
      return;
    }

    const { camera, microphone } = await queryPermissionStates();

    if (camera === "granted" && microphone === "granted") {
      setStatus("error");
      return;
    }

    if (camera === "denied" || microphone === "denied") {
      setStatus("denied");
      return;
    }

    setStatus("idle");
  }, [applyStream, attachSharedStream]);

  const setMuted = useCallback((muted: boolean) => {
    streamRef.current
      ?.getAudioTracks()
      .forEach((track) => {
        track.enabled = !muted;
      });
  }, []);

  const setCameraEnabled = useCallback((enabled: boolean) => {
    streamRef.current
      ?.getVideoTracks()
      .forEach((track) => {
        track.enabled = enabled;
      });
    setCameraEnabledState(enabled);
  }, []);

  useEffect(() => {
    if (status !== "ready") return;
    syncVideo();
  }, [status, syncVideo]);

  useEffect(() => {
    if (probeStartedRef.current) return;
    probeStartedRef.current = true;

    if (attachSharedStream()) return;

    let cancelled = false;

    const probeExistingAccess = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        if (!cancelled) setStatus("error");
        return;
      }

      const stream = await tryAcquireStream();
      if (cancelled) {
        stream?.getTracks().forEach((track) => track.stop());
        return;
      }

      if (stream) {
        applyStream(stream);
        return;
      }

      const { camera, microphone } = await queryPermissionStates();
      if (cancelled) return;

      if (camera === "denied" || microphone === "denied") {
        setStatus("denied");
        return;
      }

      if (!cancelled) setStatus("idle");
    };

    void probeExistingAccess();

    return () => {
      cancelled = true;
    };
  }, [applyStream, attachSharedStream]);

  useEffect(() => {
    if (!navigator.permissions?.query) return;

    let disposed = false;
    let cameraPerm: PermissionStatus | null = null;
    let micPerm: PermissionStatus | null = null;

    const onPermissionChange = () => {
      if (disposed || status === "ready" || status === "requesting") return;

      const cameraState = cameraPerm?.state;
      const micState = micPerm?.state;

      if (cameraState === "granted" && micState === "granted") {
        void tryAcquireStream().then((stream) => {
          if (!stream) {
            if (!disposed) setStatus("error");
            return;
          }
          if (!disposed) applyStream(stream);
          else stream.getTracks().forEach((track) => track.stop());
        });
        return;
      }

      if (cameraState === "denied" || micState === "denied") {
        setStatus("denied");
      }
    };

    void Promise.all([
      navigator.permissions.query({ name: "camera" as PermissionName }),
      navigator.permissions.query({ name: "microphone" as PermissionName }),
    ])
      .then(([camera, microphone]) => {
        if (disposed) return;
        cameraPerm = camera;
        micPerm = microphone;
        camera.addEventListener("change", onPermissionChange);
        microphone.addEventListener("change", onPermissionChange);
      })
      .catch(() => {
        /* Permissions API unsupported */
      });

    return () => {
      disposed = true;
      cameraPerm?.removeEventListener("change", onPermissionChange);
      micPerm?.removeEventListener("change", onPermissionChange);
    };
  }, [applyStream, status]);

  return {
    localRef,
    status,
    cameraEnabled,
    requestAccess,
    setMuted,
    setCameraEnabled,
    stopStream,
    syncVideo,
  };
}
