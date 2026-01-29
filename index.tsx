
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './src/mocks/browser';

async function enableMocking() {
  // To enable mocking, set VITE_ENABLE_MOCKING to "true" in your .env file
  if (import.meta.env.VITE_ENABLE_MOCKING !== 'true') {
    return Promise.resolve();
  }
 
  console.log('Mock Service Worker is enabled.');
  return worker.start();
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
