
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface Props {
  // Fix: Making children optional helps resolve JSX type mismatch in some TypeScript configurations
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

// Fix: Explicitly extending React.Component with generics to ensure 'state' and 'props' are correctly recognized
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // Fix: Correctly initialize state on the instance
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    // Fix: Accessing this.state which is now properly typed
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-8">
          <h1 className="text-4xl font-bold mb-4">CRASH PREVENTED</h1>
          <p className="text-slate-400 mb-8">Something went wrong, but we caught it.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors font-bold"
          >
            RELOAD SITE
          </button>
        </div>
      );
    }
    // Fix: Accessing this.props.children which is now properly typed
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* Fix: Providing children to ErrorBoundary is now correctly validated */}
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
