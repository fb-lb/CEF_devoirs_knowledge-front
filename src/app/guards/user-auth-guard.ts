import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Guard that checks whether the current user is connected as a user.
 *
 * @function userAuthGuard
 * @async
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
 * - Sends a request to `/api/authentification/user` to validate the user session.
 * - If the request fails with an `HttpErrorResponse`, the user is redirected with a message
 *   explaining that he has to be connected to access this page.
 * - If another error occurs, the user is redirected with a more generic message.
 */
export const userAuthGuard: CanActivateFn = async (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  
  try {
    await firstValueFrom(
      http.get(environment.backUrl + '/api/authentification/user')
    );
    return true;
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      return router.createUrlTree(['/'], {
        queryParams: {
          success: false,
          message: 'Vous êtes actuellement déconnecté.',
        },
      });
    }
    console.error(error);
    // add external service like Sentry to save the error
    return router.createUrlTree(['/'], {
      queryParams: {
        success: false,
        message:
          'Nous ne parvenons pas à vérifier que vous possédez bien les droits pour accéder à cette page. Veuillez nous excuser pour la gêne occasionnée, nous mettons tout en oeuvre pour corriger ce problème.',
      },
    });
  }
};
