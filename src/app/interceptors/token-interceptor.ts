import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TokenService } from '../services/token-service';
import { inject } from '@angular/core';
import { catchError, finalize, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  const tokenObj = tokenService.getAuthToken();
  const token = tokenObj?.token;

  const authReq = token
    ? req.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401) {
        return handle401(authReq, next, tokenService, authService);
      }
      return throwError(() => err);
    })
  );
};

function handle401(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  tokenService: TokenService,
  authService: AuthService
): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;

    const refreshTokenObj = tokenService.getRefreshToken();
    if (!refreshTokenObj) return throwError(() => 'No refresh token');

    return authService.refreshToken(refreshTokenObj).pipe(
      switchMap(response => {
        tokenService.setAuthToken(response.token);
        tokenService.setRefreshToken(response.refreshToken);

        // Resolve queued requests
        refreshQueue.forEach((cb) => cb(response.token.token));
        refreshQueue = [];

        const newReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${response.token.token}`
          },
        });

        return next(newReq);
      }),
      catchError((err) => {
        tokenService.removeAuthToken();
        tokenService.removeRefreshToken();
        refreshQueue = [];
        return throwError(() => err);
      }),
      finalize(() => {
        isRefreshing = false;
      })
    );
  }

  return new Observable((observer) => {
    refreshQueue.push((newToken: string) => {
      const newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${newToken}`
        },
      });

      next(newReq).subscribe(observer);
    });
  });
}
