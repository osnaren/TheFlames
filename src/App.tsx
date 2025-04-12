import 'animate.css';
import React, { Suspense } from 'react';
import { isMobile } from 'react-device-detect';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import { MobileViewError } from './pages';

// Lazy load components for better performance
const PreLoader = React.lazy(() => import('./components/common/PreLoader'));
const FlamesMain = React.lazy(() => import('./pages/FlamesMain/FlamesMain'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));
const ManualBoard = React.lazy(() => import('./pages/ManualBoard/ManualBoard'));
const LobyMain = React.lazy(() => import('./pages/LobyMain/LobyMain'));

// Simple loading component for route transitions
function RouteLoading() {
  return (
    <div className="route-loading">
      <div className="loading-spinner" />
    </div>
  );
}

function App(): JSX.Element {
  if (isMobile) {
    return (
      <div className="App">
        <MobileViewError />
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home route redirects to loby */}
          <Route path="/" element={<Navigate to="/loby" replace />} />

          {/* Add a dedicated route for preloader if needed */}
          <Route path="/loading" element={<PreLoader />} />

          {/* Main application routes with Suspense for lazy loading */}
          <Route
            path="/manual"
            element={
              <Suspense fallback={<RouteLoading />}>
                <ManualBoard />
              </Suspense>
            }
          />

          <Route
            path="/flames"
            element={
              <Suspense fallback={<RouteLoading />}>
                <FlamesMain />
              </Suspense>
            }
          />

          <Route
            path="/loby"
            element={
              <Suspense fallback={<RouteLoading />}>
                <LobyMain />
              </Suspense>
            }
          />

          {/* Catch all route for 404 */}
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteLoading />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </Router>
  );
}

export default App;
