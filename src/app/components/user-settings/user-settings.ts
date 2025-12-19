import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TurnstileService } from '../../services/turnstile-service';
import { TurnstileDirective } from '../../directives/turnstile-directive';
import { LoadingService } from '../../services/loading-service';
import { LoadingComponent } from "../loading-component/loading-component";

@Component({
  selector: 'app-user-settings',
  imports: [ReactiveFormsModule, TurnstileDirective, LoadingComponent],
  templateUrl: './user-settings.html',
  styleUrls: ['./user-settings.scss', '../helpers/auth-form.scss'],
})
export class UserSettings {
  private formBuilder = inject(FormBuilder);

  private userService = inject(UserService);
  private turnstileService = inject(TurnstileService);
  private loadingService = inject(LoadingService);
  isLoading = this.loadingService.isLoading;

  email = signal<string | null>(null);

  error = signal<string | null>(null);

  passwordForm!: FormGroup;

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatch });

    this.getEmail();
  }

  getEmail(): void {
    this.loadingService.loadingOn();
    this.error.set(null);

    this.userService.getEmail()
    .subscribe({
      next: (response) => {
        this.email.set(response);
        this.loadingService.loadingOff()
      },
      error: (err) => {
        console.error('Error loading user email:', err);
        this.error.set('Failed to load user email');
        this.loadingService.loadingOff()
      }
    });
  }

  passwordsMatch(form: any) {
    const pw = form.get('password')?.value;
    const cpw = form.get('confirmPassword')?.value;
    return pw === cpw ? null : { passwordMismatch: true };
  }

  passwordFormError(): string | null {
    const c = this.passwordForm?.controls['password'];
    const cp = this.passwordForm?.controls['confirmPassword'];

    if (!c || !cp) return null;
    if (!c.touched && !cp.touched) return null;

    if (c.errors?.['required']) return 'Password is required';
    if (c.errors?.['minlength']) return 'Password must be at least 6 characters';
    if (this.passwordForm.errors?.['passwordMismatch']) return 'Passwords do not match';

    return null;
  }

  submitPasswordForm(): void {
    if (this.passwordForm.invalid) return;

    const newPassword = this.passwordForm.value.password;

    this.loadingService.loadingOn()
    this.error.set(null);

    const token = this.turnstileService.getToken();
    if (!token) {
      this.error.set('Please complete the captcha');
      this.loadingService.loadingOff()
      return;
    }

    this.userService.changePassword(newPassword)
    .subscribe({
      next: () => {
        alert('Password updated successfully!');
        this.passwordForm.reset();
        this.loadingService.loadingOff()
      },
      error: (err) => {
        this.error.set('Failed to update password');
        this.loadingService.loadingOff()
        console.error('Error updating password:', err);
      }
    });
  }
}
