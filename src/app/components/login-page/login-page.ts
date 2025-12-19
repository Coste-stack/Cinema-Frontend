import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';
import { AuthFormBase } from '../helpers/auth-form-base';
import { TurnstileDirective } from '../../directives/turnstile-directive';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink, TurnstileDirective],
  templateUrl: './login-page.html',
  styleUrls: ['../helpers/user-auth-form.scss', '../helpers/auth-form.scss','./login-page.scss'],
})
export class LoginPage extends AuthFormBase {
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
}
