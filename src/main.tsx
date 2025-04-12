import '@styles/index.scss';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { setupApp } from './lib/utils';

// Create a simple loading indicator instead of using the PreLoader component
function LoadingIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      Loading...
    </div>
  );
}

// Lazy load the main App component
const App = React.lazy(() => import('./App'));

// Root component that initializes app utilities
function Root() {
  useEffect(() => {
    // Initialize animation utilities and other app setup
    setupApp();
  }, []);

  return (
    <React.Suspense fallback={<LoadingIndicator />}>
      <App />
    </React.Suspense>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
