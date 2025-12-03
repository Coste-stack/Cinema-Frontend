import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { LoginPage } from './components/login-page/login-page';
import { RegisterPage } from './components/register-page/register-page';
import { RepertoirePage } from './components/repertoire-page/repertoire-page';
import { ScreeningPage } from './components/screening-page/screening-page';

export const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'repertuar', component: RepertoirePage },
  { path: 'repertuar/:id', component: ScreeningPage }
];
