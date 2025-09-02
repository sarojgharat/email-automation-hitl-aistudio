
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './src/mocks/browser';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
 
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
