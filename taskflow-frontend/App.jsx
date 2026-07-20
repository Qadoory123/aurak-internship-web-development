/* ---------- Layout wrapper & theme ---------- */
.app-wrapper {
  min-height: 100vh;
  background: #f4f6f8;
  color: #1a1a1a;
  transition: background 0.2s, color 0.2s;
}

.app-wrapper.dark {
  background: #14181f;
  color: #e5e7eb;
}

.page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 20px 60px;
}

.page h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.page h2 {
  font-size: 20px;
  margin: 32px 0 16px;
}

/* ---------- Navbar ---------- */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.app-wrapper.dark .navbar {
  background: #1c212b;
  border-bottom: 1px solid #2d3341;
}

.navbar-brand {
  font-weight: 700;
  font-size: 20px;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navbar-links a {
  font-weight: 500;
  font-size: 15px;
  color: inherit;
  opacity: 0.85;
}

.navbar-links a:hover {
  opacity: 1;
}

.theme-toggle {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  background: white;
  cursor: pointer;
  font-size: 13px;
}

.app-wrapper.dark .theme-toggle {
  background: #2d3341;
  border-color: #3d4457;
  color: #e5e7eb;
}

/* ---------- Status messages ---------- */
.status-message {
  padding: 40px 20px;
  text-align: center;
  font-size: 16px;
  color: #64748b;
}

.status-message.error {
  color: #dc2626;
}

.empty-state {
  padding: 24px;
  text-align: center;
  color: #94a3b8;
  font-style: italic;
}

/* ---------- Dashboard stats ---------- */
.dashboard-stats {
  display: flex;
  gap: 16px;
  margin: 20px 0 32px;
}

.stat-box {
  flex: 1;
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.app-wrapper.dark .stat-box {
  background: #1c212b;
  box-shadow: none;
  border: 1px solid #2d3341;
}

.stat-number {
  display: block;
  font-size: 32px;
  font-weight: 700;
}

.stat-label {
  display: block;
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* ---------- Grids ---------- */
.project-grid,
.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

/* ---------- Project card ---------- */
.project-card {
  background: white;
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  position: relative;
}

.app-wrapper.dark .project-card {
  background: #1c212b;
  box-shadow: none;
  border: 1px solid #2d3341;
}

.project-card h3 {
  margin: 0 0 6px;
  font-size: 17px;
}

.project-card p {
  margin: 0 0 10px;
  font-size: 14px;
  color: #64748b;
}

.project-card .task-count {
  font-size: 13px;
  color: #3b82f6;
  font-weight: 500;
}

.project-card .delete-btn {
  margin-top: 12px;
}

/* ---------- Task card ---------- */
.task-card {
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.app-wrapper.dark .task-card {
  background: #1c212b;
  box-shadow: none;
  border: 1px solid #2d3341;
}

.task-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.task-card-header h4 {
  margin: 0;
  font-size: 15px;
}

.task-card p {
  font-size: 13px;
  color: #64748b;
  margin: 0 0 10px;
}

.task-card-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.task-card-actions a {
  font-size: 13px;
  font-weight: 500;
  color: #3b82f6;
}

/* ---------- Status badge ---------- */
.status-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: white;
  text-transform: capitalize;
  white-space: nowrap;
}

/* ---------- Priority ---------- */
.priority {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  padding: 2px 8px;
  border-radius: 6px;
  background: #f1f5f9;
  color: #475569;
}

.app-wrapper.dark .priority {
  background: #2d3341;
  color: #cbd5e1;
}

.priority-high {
  color: #dc2626;
}

.priority-medium {
  color: #d97706;
}

.priority-low {
  color: #16a34a;
}

/* ---------- Buttons (generic) ---------- */
button {
  font-family: inherit;
}

.delete-btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #fca5a5;
  background: white;
  color: #dc2626;
  font-size: 13px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #fef2f2;
}

.app-wrapper.dark .delete-btn {
  background: transparent;
  border-color: #7f1d1d;
  color: #f87171;
}

.add-task-btn {
  display: inline-block;
  margin: 16px 0;
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
}

.add-task-btn:hover {
  background: #2563eb;
}

/* ---------- Status filter ---------- */
.status-filter {
  display: flex;
  gap: 8px;
  margin: 16px 0 24px;
}

.status-filter button {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  background: white;
  cursor: pointer;
  font-size: 13px;
  text-transform: capitalize;
}

.status-filter button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.app-wrapper.dark .status-filter button {
  background: #1c212b;
  border-color: #2d3341;
  color: #e5e7eb;
}

.app-wrapper.dark .status-filter button.active {
  background: #3b82f6;
  border-color: #3b82f6;
}

/* ---------- Project detail header ---------- */
.project-detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

/* ---------- Forms ---------- */
.project-form {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0 32px;
}

.project-form input {
  padding: 9px 12px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
  flex: 1;
  min-width: 180px;
  background: white;
  color: inherit;
}

.project-form button {
  padding: 9px 18px;
  border-radius: 6px;
  border: none;
  background: #3b82f6;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.project-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.app-wrapper.dark .project-form input {
  background: #1c212b;
  border-color: #2d3341;
  color: #e5e7eb;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 480px;
  margin-top: 20px;
}

.task-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
}

.task-form input,
.task-form textarea,
.task-form select {
  padding: 9px 12px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
  font-family: inherit;
  background: white;
  color: inherit;
}

.app-wrapper.dark .task-form input,
.app-wrapper.dark .task-form textarea,
.app-wrapper.dark .task-form select {
  background: #1c212b;
  border-color: #2d3341;
  color: #e5e7eb;
}

.task-form textarea {
  min-height: 80px;
  resize: vertical;
}

.task-form button {
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  background: #3b82f6;
  color: white;
  font-size: 14px;
  cursor: pointer;
  align-self: flex-start;
}

.task-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-error {
  color: #dc2626;
  font-size: 13px;
}

/* ---------- About page ---------- */
.page ul {
  padding-left: 20px;
  line-height: 1.8;
}

/* ---------- Responsive ---------- */
@media (max-width: 640px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .dashboard-stats {
    flex-direction: column;
  }

  .project-detail-header {
    flex-direction: column;
  }
}
