import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { LoginPage } from './components/login-page/login-page';
import { RegisterPage } from './components/register-page/register-page';
import { UserPage } from './components/user-page/user-page';
import { RepertoirePage } from './components/repertoire-page/repertoire-page';
import { ScreeningPage } from './components/screening-page/screening-page';
import { TicketPage } from './components/ticket-page/ticket-page';
import { BookingPage } from './components/booking-page/booking-page';
import { BookingFailPage } from './components/booking-fail-page/booking-fail-page';

export const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'user', component: UserPage },
  { path: 'repertuar', component: RepertoirePage },
  { path: 'repertuar/:id', component: ScreeningPage },
  { path: 'rezerwacja/bilety', component: TicketPage },
  { path: 'rezerwacja/zamowienie', component: BookingPage },
  { path: 'rezerwacja/blad', component: BookingFailPage }
];
