"use client";

import { useUiSession } from "@/components/site/ui-session-provider";
import {
  fetchReportReasons,
  submitUserReport,
} from "@/features/report/api/report-api";
import { BlockConfirmDialog } from "@/features/report/components/block-confirm-dialog";
import { chatSocket } from "@/features/chat/services/socket-service";
import { Check, ChevronLeft, ChevronRight, ImagePlus, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const MAX_PHOTOS = 4;

type ReportUserDialogProps = {
  open: boolean;
  onClose: () => void;
  reporteeId: string;
  reporteeName: string;
  roomId: string;
  reporteeEmail: string;
};

export function ReportUserDialog({
  open,
  onClose,
  reporteeId,
  reporteeName,
  roomId,
  reporteeEmail,
}: ReportUserDialogProps) {
  const { user } = useUiSession();
  const [step, setStep] = useState(0);
  const [reasons, setReasons] = useState<string[]>([]);
  const [loadingReasons, setLoadingReasons] = useState(false);
  const [reason, setReason] = useState("");
  const [explanation, setExplanation] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blockPromptOpen, setBlockPromptOpen] = useState(false);

  const reset = useCallback(() => {
    setStep(0);
    setReason("");
    setExplanation("");
    setFiles([]);
    setError(null);
    setSubmitting(false);
    setBlockPromptOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      reset();
      return;
    }
    setLoadingReasons(true);
    void fetchReportReasons()
      .then(setReasons)
      .finally(() => setLoadingReasons(false));
  }, [open, reset]);

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files, ...Array.from(list)].slice(0, MAX_PHOTOS);
    setFiles(next);
  };

  const handleSubmit = async () => {
    if (!user?._id || !reason.trim() || !explanation.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitUserReport({
        reporterId: user._id,
        reporteeId,
        reason,
        explanation: explanation.trim(),
        files,
      });
      onClose();
      if (reporteeEmail.trim()) {
        setBlockPromptOpen(true);
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not submit report.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const canNext =
    step === 0
      ? Boolean(reason)
      : step === 1
        ? explanation.trim().length >= 8
        : true;

  if (!open && !blockPromptOpen) return null;

  return (
    <>
      <div
        className={`modal-backdrop${open ? " is-open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-labelledby="reportUserTitle"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <div className="report-modal">
          <div className="report-modal-head">
            <button
              type="button"
              className="report-modal-back"
              onClick={() => (step > 0 ? setStep(step - 1) : handleClose())}
              aria-label={step > 0 ? "Back" : "Close"}
            >
              {step > 0 ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
            </button>
            <div>
              <p className="report-modal-eyebrow">Report user</p>
              <h2 id="reportUserTitle">{reporteeName}</h2>
            </div>
            <div className="report-modal-steps" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`report-modal-step-dot${i <= step ? " is-active" : ""}${i < step ? " is-done" : ""}`}
                />
              ))}
            </div>
          </div>

          {error && (
            <p className="report-modal-error" role="alert">
              {error}
            </p>
          )}

          {step === 0 && (
            <div className="report-modal-body">
              <p className="report-modal-lead">
                Why are you reporting {reporteeName}?
              </p>
              {loadingReasons ? (
                <div className="report-modal-loading">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading reasons…
                </div>
              ) : (
                <ul className="report-reason-list">
                  {reasons.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className={`report-reason-item${reason === item ? " is-selected" : ""}`}
                        onClick={() => setReason(item)}
                      >
                        <span>{item}</span>
                        {reason === item && (
                          <Check className="h-4 w-4 shrink-0 text-[var(--primary)]" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="report-modal-body">
              <p className="report-modal-lead">Tell us what happened</p>
              <textarea
                className="report-modal-textarea"
                rows={5}
                placeholder="Share details that will help our team review this report…"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
              />
              <div className="report-modal-photos">
                <label className="report-photo-add">
                  <ImagePlus className="h-5 w-5" />
                  <span>Add photos ({files.length}/{MAX_PHOTOS})</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => addFiles(e.target.files)}
                    disabled={files.length >= MAX_PHOTOS}
                  />
                </label>
                {files.length > 0 && (
                  <ul className="report-photo-list">
                    {files.map((file, i) => (
                      <li key={`${file.name}-${i}`}>
                        <span className="truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setFiles(files.filter((_, idx) => idx !== i))
                          }
                          aria-label="Remove photo"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="report-modal-body">
              <p className="report-modal-lead">Review your report</p>
              <dl className="report-review">
                <div>
                  <dt>Reason</dt>
                  <dd>{reason}</dd>
                </div>
                <div>
                  <dt>Details</dt>
                  <dd>{explanation}</dd>
                </div>
                <div>
                  <dt>Photos</dt>
                  <dd>{files.length} attached</dd>
                </div>
              </dl>
            </div>
          )}

          <div className="report-modal-foot">
            {step < 2 ? (
              <button
                type="button"
                className="report-modal-next"
                disabled={!canNext}
                onClick={() => setStep(step + 1)}
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                className="report-modal-next"
                disabled={submitting || !canNext}
                onClick={() => void handleSubmit()}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit report"
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <BlockConfirmDialog
        open={blockPromptOpen}
        userName={reporteeName}
        onClose={() => setBlockPromptOpen(false)}
        onConfirm={() => {
          setBlockPromptOpen(false);
          chatSocket.blockUser(roomId, reporteeEmail);
        }}
      />
    </>
  );
}
