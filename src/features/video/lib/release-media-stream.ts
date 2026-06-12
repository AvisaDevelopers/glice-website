/** Detach and stop tracks on a remote MediaStream (safe after RTCPeerConnection closed). */
export function releaseMediaStream(stream: MediaStream | null | undefined) {
  if (!stream) return;
  stream.getTracks().forEach((track) => {
    try {
      track.stop();
    } catch {
      /* ignore */
    }
  });
}
