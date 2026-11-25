import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root');

declare global {
  interface Window {
    __KUBER_MOUNTED__?: boolean;
  }
}

function renderFallback(message: string) {
  if (!rootEl) return;
  rootEl.innerHTML = `
    <div style="min-height:100vh;background:#0A0A0A;color:#F3F4F6;display:flex;align-items:center;justify-content:center;padding:24px;font-family:sans-serif;text-align:center;">
      <div style="max-width:420px;border:1px solid #D4AF37;border-radius:16px;padding:24px;background:#111;">
        <h2 style="color:#FFDF73;margin:0 0 8px;">KUBER Portal Recovery</h2>
        <p style="font-size:13px;color:#A1A1AA;margin:0 0 16px;">${message.replace(/</g, '&lt;')}</p>
        <button onclick="window.location.reload()" style="background:linear-gradient(135deg,#FFDF73,#D4AF37);color:#000;font-weight:700;border:none;border-radius:10px;padding:10px 18px;cursor:pointer;">Reload Portal</button>
      </div>
    </div>
  `;
}

window.addEventListener('error', (event) => {
  if (rootEl && !window.__KUBER_MOUNTED__) {
    renderFallback(event.message || 'Unable to load portal script.');
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (rootEl && !window.__KUBER_MOUNTED__) {
    const reason = event.reason instanceof Error ? event.reason.message : String(event.reason || 'Startup error');
    renderFallback(reason);
  }
});

try {
  if (rootEl) {
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    window.__KUBER_MOUNTED__ = true;
  }
} catch (err) {
  renderFallback(err instanceof Error ? err.message : 'Unexpected startup error.');
}
