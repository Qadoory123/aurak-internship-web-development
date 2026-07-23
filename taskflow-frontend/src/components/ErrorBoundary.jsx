import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught error in component tree:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-container">
          <div className="card">
            <h2 className="card-title">Something went wrong</h2>
            <p className="card-meta">
              This page hit an unexpected error. Try going back to the
              dashboard.
            </p>
            <a href="/" className="btn btn-primary">
              Back to Dashboard
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
