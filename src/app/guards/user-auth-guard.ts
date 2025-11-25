import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

/**
 * Guard that checks whether the current user is connected as a user.
 *
 * @function userAuthGuard
 *
 * @param {ActivatedRouteSnapshot} route - The route that is being accessed.
 * @param {RouterStateSnapshot} state - The current router state.
 *
 * @returns {boolean | UrlTree}
 * Returns `true` if the user is connected as a user,
 * otherwise returns a `UrlTree` redirecting the user to the home page
 * with an error message in query parameters.
 *
 * @description
 * - Checks that user has a cookie named 'isAuth'.
 * - If true, it validates user session otherwise the user is redirected with a message
 *   explaining that user rights are required.
 */
export const userAuthGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  
  const isAuth = cookieService.get('isAuth');

  if (isAuth) return true;
    
  return router.createUrlTree(['/'], {
      queryParams: {
        success: false,
        message: "Vous devez être connecté en tant qu'utilisateur pour accéder à cette page.",
      }
    });
};
