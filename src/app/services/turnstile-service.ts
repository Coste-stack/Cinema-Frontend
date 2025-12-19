import { Injectable, inject } from '@angular/core';
import { RuntimeConfigService } from './runtime-config.service';

@Injectable({
  providedIn: 'root',
})
export class TurnstileService {
  private token: string | null = null;
  private runtimeConfig = inject(RuntimeConfigService);

  render(containerId: string): void {
    const siteKey = this.runtimeConfig.getTurnstileSiteKey()
      ?? document.querySelector('meta[name="turnstile-site-key"]')?.getAttribute('content')
      ?? (window as any).__APP_CONFIG__?.turnstileSiteKey;
    if (!siteKey) {
      console.warn('Turnstile site key not found in runtime config or meta tag');
      return;
    }

    const container = document.getElementById(containerId);
    if (container && (window as any).turnstile) {
      try {
        (window as any).turnstile.render(container, {
          sitekey: siteKey,
          callback: (token: string) => this.setToken(token),
        });
      } catch (e) {
        console.warn('Turnstile render failed', e);
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string | null): void {
    this.token = token;
  }
}
