import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';
import { AuthFormBase } from '../helpers/auth-form-base';
import { TurnstileDirective } from '../../directives/turnstile-directive';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink, TurnstileDirective],
  templateUrl: './register-page.html',
  styleUrls: ['../helpers/user-auth-form.scss', '../helpers/auth-form.scss', './register-page.scss'],
})
export class RegisterPage extends AuthFormBase {
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
    return this.authService.register(credentials);
  }
}
