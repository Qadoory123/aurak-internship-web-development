export default function FormField({ label, htmlFor, error, children }) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
