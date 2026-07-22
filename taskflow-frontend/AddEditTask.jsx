const STATUSES = ["all", "todo", "in-progress", "done"];

export default function StatusFilter({ current, onChange }) {
  return (
    <div className="status-filter">
      {STATUSES.map((status) => (
        <button
          key={status}
          className={current === status ? "active" : ""}
          onClick={() => onChange(status)}
        >
          {status === "all" ? "All" : status}
        </button>
      ))}
    </div>
  );
}
