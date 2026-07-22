const LABELS = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${status}`}>{LABELS[status] || status}</span>
  );
}
