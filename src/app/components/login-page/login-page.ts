import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private router = inject(Router);
  private authService = inject(AuthService);
  loading = signal(false);
  error = signal<string | null>(null);
  private formBuilder = inject(FormBuilder);
  userForm: any;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submit(): void {
    console.log('Form data:', this.userForm?.value);
    if (!this.userForm.value) return;

    this.loading.set(true);
    this.error.set(null);

    const credentials = this.userForm.value;

    this.authService.login(credentials)
      .subscribe({
        next: (response) => {
          console.log('Login success:', response);
          this.loading.set(false);

          const token = response.token.token;
          const expires = new Date(response.token.expiresAt);
          console.log('Token expires at:', expires);

          // Update token in service
          this.authService.setLocalToken(token, expires);

          this.router.navigate(['/user']);
        },
        error: (err) => {
          console.error('Error logging in:', err);
          this.error.set('Login failed');
          this.loading.set(false);
        }
      }
    );
  }
}
