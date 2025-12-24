import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Guard that checks whether the current user is not connected.
 *
 * @function notAuthGuard
 *
 * @param {ActivatedRouteSnapshot} route - The route that is being accessed.
 * @param {RouterStateSnapshot} state - The current router state.
 *
 * @returns {boolean | UrlTree}
 * Returns `true` if the user is not connected,
 * otherwise returns a `UrlTree` redirecting the user to the home page
 * with an error message in query parameters.
 *
 * @description
 * - Checks that user has not a a token in local storage.
 * - If true, it validates the access to the page otherwise the user is redirected with a message
 *   explaining that he needs to be disconnected.
 */
export const notAuthGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  const isAuth = localStorage.getItem('token');

  if (!isAuth) return true;
    
  return router.createUrlTree(['/'], {
      queryParams: {
        success: false,
        message: "Vous êtes déjà connecté, vous ne pouvez pas accéder à cette page.",
      }
    });
};
