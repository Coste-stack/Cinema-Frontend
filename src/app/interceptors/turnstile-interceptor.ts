import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TurnstileService } from '../services/turnstile-service';

export const turnstileInterceptor: HttpInterceptorFn = (req, next) => {
  const turnstile = inject(TurnstileService);
  const token = turnstile.getToken();

  const newReq = token
    ? req.clone({ setHeaders: { 'CF-Turnstile-Token': token } })
    : req;

  return next(newReq);
};
