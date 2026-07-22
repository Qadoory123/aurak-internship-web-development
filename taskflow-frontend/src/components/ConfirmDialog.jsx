import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Delete",
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <p className="card-meta">{message}</p>
      <div
        className="card-actions"
        style={{ justifyContent: "flex-end", marginTop: "16px" }}
      >
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
