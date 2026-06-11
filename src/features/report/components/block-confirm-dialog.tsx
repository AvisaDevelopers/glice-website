"use client";

type BlockConfirmDialogProps = {
  open: boolean;
  userName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function BlockConfirmDialog({
  open,
  userName,
  onClose,
  onConfirm,
}: BlockConfirmDialogProps) {
  return (
    <div
      className={`modal-backdrop${open ? " is-open" : ""}`}
      aria-hidden={!open}
      role="dialog"
      aria-labelledby="blockUserTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="confirm-modal">
        <button
          type="button"
          className="auth-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          <i className="ri-close-line" />
        </button>
        <div className="confirm-modal-icon" aria-hidden="true">
          <i className="ri-forbid-line" />
        </div>
        <h2 id="blockUserTitle">Block {userName}?</h2>
        <p className="auth-modal-sub">
          They won&apos;t be able to message you and this chat will be removed
          from your inbox.
        </p>
        <div className="confirm-modal-actions">
          <button type="button" className="confirm-modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="confirm-modal-confirm confirm-modal-confirm--danger"
            onClick={onConfirm}
          >
            Block
          </button>
        </div>
      </div>
    </div>
  );
}
