import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { LoginPage } from './components/login-page/login-page';
import { RegisterPage } from './components/register-page/register-page';
import { RepertoirePage } from './components/repertoire-page/repertoire-page';

export const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'repertuar', component: RepertoirePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
];
