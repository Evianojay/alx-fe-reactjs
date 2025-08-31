import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-cyan-300 flex items-center justify-center">
          <div className="text-center p-8 bg-black/40 backdrop-blur-md border border-red-500/30 rounded-lg">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">System Error</h2>
            <p className="text-gray-300 mb-4">Something went wrong in the matrix...</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:scale-105 transition-transform"
            >
              Reboot System
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
