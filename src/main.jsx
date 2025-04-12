import React from 'react';
import ReactDOM from 'react-dom/client';
import '@styles/index.scss';

const App = React.lazy(() => import('./App'));
const PreLoader = React.lazy(() => import('@components/PreLoader/index')); // Import PreLoader

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback={<PreLoader />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
