export default function DashboardStats({ tasks }) {
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <div className="dashboard-stats">
      <div className="stat-box">
        <span className="stat-number">{todo}</span>
        <span className="stat-label">To Do</span>
      </div>
      <div className="stat-box">
        <span className="stat-number">{inProgress}</span>
        <span className="stat-label">In Progress</span>
      </div>
      <div className="stat-box">
        <span className="stat-number">{done}</span>
        <span className="stat-label">Done</span>
      </div>
    </div>
  );
}
