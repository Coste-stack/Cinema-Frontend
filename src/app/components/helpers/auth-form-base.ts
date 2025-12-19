import { inject, signal } from '@angular/core';
import { TurnstileService } from '../../services/turnstile-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { LoadingService } from '../../services/loading-service';

export abstract class AuthFormBase {
  private router = inject(Router);
  protected formBuilder = inject(FormBuilder);
  protected authService = inject(AuthService);
  protected turnstileService = inject(TurnstileService);

  protected loadingService = inject(LoadingService);
  protected isLoading = (key: string) => this.loadingService.isLoading(key);
  readonly key: string = "auth-form";

  error = signal<string | null>(null);

  userForm!: FormGroup<any>;

  protected turnstileToken: string | null = null;

  protected initForm(controls: Record<string, any>): void {
    this.userForm = this.formBuilder.group(controls);
  }

  setTurnstileToken(token: string | null) {
    this.turnstileToken = token;
    try {
      this.turnstileService.setToken(token);
    } catch (e) {
      console.warn('Failed to propagate turnstile token to service', e);
    }
  }

  submitBase(): void {
    if (!this.userForm) return;

    this.userForm.markAllAsTouched();
    this.loadingService.loadingOn(this.key);
    this.error.set(null);

    if (this.userForm.invalid) {
      this.loadingService.loadingOff(this.key);
      return;
    }

    const credentials = this.userForm.value;
    this.perform(credentials).subscribe({
      next: (res) => this.onSuccess(res),
      error: (err) => this.onError(err),
    });
  }

  protected onSuccess(response: any): void {
    this.loadingService.loadingOff(this.key);
    const token = response?.token?.token;
    const expires = response?.token?.expiresAt ? new Date(response.token.expiresAt) : null;
    if (token && expires) this.authService.setLocalToken(token, expires);
    this.router.navigate(['/user']);
  }

  protected onError(err: any): void {
    console.error(err);
    this.error.set('Request failed');
    this.loadingService.loadingOff(this.key);
  }

  protected abstract perform(credentials: any): Observable<any>;
}
