import { inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export abstract class AuthFormBase {
  protected formBuilder = inject(FormBuilder);
  loading = signal(false);
  error = signal<string | null>(null);
  userForm!: FormGroup<any>;

  protected initForm(controls: Record<string, any>): void {
    this.userForm = this.formBuilder.group(controls);
  }

  submitBase(): void {
    if (!this.userForm) return;

    this.userForm.markAllAsTouched();
    this.loading.set(true);
    this.error.set(null);

    if (this.userForm.invalid) {
      this.loading.set(false);
      return;
    }

    const credentials = this.userForm.value;
    this.perform(credentials).subscribe({
      next: (res) => this.onSuccess(res),
      error: (err) => this.onError(err),
    });
  }

  protected onSuccess(response: any): void {
    this.loading.set(false);
    this.afterSuccess(response);
  }

  protected onError(err: any): void {
    console.error(err);
    this.error.set('Request failed');
    this.loading.set(false);
  }

  protected abstract perform(credentials: any): Observable<any>;
  protected abstract afterSuccess(response: any): void;
}
