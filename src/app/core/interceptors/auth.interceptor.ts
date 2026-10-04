import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import {AuthService} from '../../infraestructure/persistence/auth.service';
import { AuthorizationFeedbackService } from '../../shared/services/authorization-feedback.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const authorizationFeedback = inject(AuthorizationFeedbackService);

  const token = auth.getToken();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        auth.clearToken();
        router.navigate(['/']);
      } else if (error.status === 403) {
        authorizationFeedback.notifyUnauthorizedAction();
      }
      return throwError(() => error);
    })
  );
};
