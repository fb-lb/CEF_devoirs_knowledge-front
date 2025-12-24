import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiResponse } from '../models/api-response.model';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const token = localStorage.getItem('token');

  // Add token in Authorization header request
  if(token) req = req.clone({
    setHeaders: {
      Authorization: token,
    },
  })
  
  // Handle token refresh and block token refresh for a few seconds
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        const authHeader = event.headers.get('Authorization');
        if (authHeader && authService.isTokenRefreshAllowed) {
          authService.connected(authHeader);
          authService.freezeTokenRefresh();
        }
      }
    }),

    catchError((error: HttpErrorResponse) => {
    if (error instanceof HttpErrorResponse) {
        const response = error.error as ApiResponse;
        const token = localStorage.getItem('token');
        if (token && error.status === 500 && response.message === "La vérification du token utilisateur a échoué, veuillez réessayer ultérieurement ou contacter le support.") {
          authService.disconnected();
        }
      }
    return throwError(() => error);
    })
  );
};