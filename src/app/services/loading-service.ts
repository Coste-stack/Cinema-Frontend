import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isLoading = signal(false);

  readonly isLoading = this._isLoading.asReadonly();

  loadingOn() {
    this._isLoading.set(true);
  }

  loadingOff() {
    this._isLoading.set(false);
  }
}
