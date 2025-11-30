import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
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

          const token = response.token;
          const expires = new Date(response.expiresAt);
          console.log('Token:', token);
          console.log('Expires at:', expires);
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
