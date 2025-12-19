import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loaders = new Map<string, WritableSignal<boolean>>;

  isLoading(key: string): boolean {
    if (!this.loaders.has(key)) {
      this.loaders.set(key, signal(false));
    }
    return this.loaders.get(key)!();
  }

  loadingOn(key: string) {
    this.getLoader(key).set(true);
  }

  loadingOff(key: string) {
    this.getLoader(key).set(false);
  }

  private getLoader(key: string): WritableSignal<boolean> {
    if (!this.loaders.has(key)) {
      this.loaders.set(key, signal(false));
    }
    return this.loaders.get(key)!;
  }
}
