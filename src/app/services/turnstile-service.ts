import { Injectable, inject } from '@angular/core';
import { RuntimeConfigService } from './runtime-config.service';

@Injectable({
  providedIn: 'root',
})
export class TurnstileService {
  private token: string | null = null;
  private runtimeConfig = inject(RuntimeConfigService);

  render(containerId: string, options?: { theme?: string | undefined; size?: string | undefined }): void {
    // Get turnstile site key
    const siteKey = this.runtimeConfig.getTurnstileSiteKey()
      ?? document.querySelector('meta[name="turnstile-site-key"]')?.getAttribute('content')
      ?? (window as any).__APP_CONFIG__?.turnstileSiteKey;
    if (!siteKey) {
      console.warn('Turnstile site key not found in runtime config or meta tag');
      return;
    }

    // Get turnstile element
    const container = document.getElementById(containerId);
    if (container && (window as any).turnstile) {
      try {
        // Add attributes to element
        const renderOptions: any = {
          sitekey: siteKey,
          callback: (token: string) => this.setToken(token),
        };
        if (options?.theme) renderOptions.theme = options.theme;
        if (options?.size) renderOptions.size = options.size;

        // Render element
        (window as any).turnstile.render(container, renderOptions);
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
