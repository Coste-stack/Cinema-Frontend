import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { AuthFormBase } from '../helpers/auth-form-base';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrls: ['../helpers/user-auth-form.scss', '../helpers/auth-form.scss','./login-page.scss'],
})
export class LoginPage extends AuthFormBase {
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.initForm({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit(): void {
    console.log('Form data:', this.userForm?.value);
    this.submitBase();
  }

  protected perform(credentials: any) {
    return this.authService.login(credentials);
  }

  protected afterSuccess(response: any): void {
    const token = response?.token?.token;
    const expires = response?.token?.expiresAt ? new Date(response.token.expiresAt) : null;
    if (token && expires) this.authService.setLocalToken(token, expires);
    this.router.navigate(['/user']);
  }
}
