const COLORS = {
  todo: "#94a3b8",
  "in-progress": "#3b82f6",
  done: "#22c55e",
};

const LABELS = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className="status-badge"
      style={{ backgroundColor: COLORS[status] || "#94a3b8" }}
    >
      {LABELS[status] || status}
    </span>
  );
}
