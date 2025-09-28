import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const isAuth = cookieService.get('isAuth');

  if (!isAuth) return true;
    
  return router.createUrlTree(['/'], {
      queryParams: {
        success: false,
        message: "Vous êtes déjà connecté, vous ne pouvez pas accéder à cette page.",
      }
    });
};
