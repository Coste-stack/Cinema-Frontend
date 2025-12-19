import { Injectable } from '@angular/core';

export interface RuntimeConfig {
  turnstileSiteKey?: string | null;
  [key: string]: any;
}

declare global {
  interface Window { __APP_CONFIG__?: RuntimeConfig }
}

@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  private config: RuntimeConfig | undefined;

  setConfig(config: RuntimeConfig) {
    this.config = config;
    window.__APP_CONFIG__ = config;
  }

  getConfig(): RuntimeConfig | undefined {
    return this.config ?? window.__APP_CONFIG__;
  }

  getTurnstileSiteKey(): string | null {
    return this.getConfig()?.turnstileSiteKey ?? null;
  }
}
