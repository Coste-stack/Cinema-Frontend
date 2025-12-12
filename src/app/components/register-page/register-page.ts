import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
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

    this.authService.register(credentials)
      .subscribe({
        next: (response) => {
          console.log('Register success:', response);
          this.loading.set(false);

          const token = response.token.token;
          const expires = new Date(response.token.expiresAt);
          console.log('Token expires at:', expires);

          // Update token in service
          this.authService.setLocalToken(token, expires);

          this.router.navigate(['/user']);
        },
        error: (err) => {
          console.error('Error registering:', err);
          this.error.set('Register failed');
          this.loading.set(false);
        }
      }
    );
  }
}
