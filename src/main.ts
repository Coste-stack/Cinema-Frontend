import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

async function loadRuntimeConfig() {
  try {
    const res = await fetch('/assets/config.json', { cache: 'no-store' });
    if (!res.ok) return null;
    const cfg = await res.json();

    // set meta tag for turnstile site key
    if (cfg?.turnstileSiteKey) {
      let meta = document.querySelector('meta[name="turnstile-site-key"]');
      if (meta) {
        meta.setAttribute('content', cfg.turnstileSiteKey);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'turnstile-site-key');
        meta.setAttribute('content', cfg.turnstileSiteKey);
        document.head.appendChild(meta);
      }
    }

    // expose globally
    (window as any).__APP_CONFIG__ = cfg;
    return cfg;
  } catch (e) {
    console.warn('Failed to load runtime config', e);
    return null;
  }
}

(async () => {
  await loadRuntimeConfig();
  bootstrapApplication(App, appConfig).catch((err) => console.error(err));
})();
