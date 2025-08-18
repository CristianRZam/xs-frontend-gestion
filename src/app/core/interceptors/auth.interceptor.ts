import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageCrypt = inject(LocalStorageService);
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();

  const authToken = localStorageCrypt.getItem<string>('auth_token');

  if (authToken && !jwtHelper.isTokenExpired(authToken)) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  } else if (authToken && jwtHelper.isTokenExpired(authToken)) {
    localStorageCrypt.clear();
    router.navigateByUrl('').then(() => window.location.reload());
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorageCrypt.clear();
        router.navigate(['']);
      }
      return throwError(() => error);
    })
  );
};
