import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export const adminAuthGuard: CanActivateFn = async (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  try {
    await firstValueFrom(
      http.get(environment.backUrl + '/api/authentification/admin', {
        withCredentials: true,
      })
    );
    return true;
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      return router.createUrlTree(['/'], {
        queryParams: {
          success: false,
          message: 'Vous ne possédez pas les droits suffisants pour accéder à cette page.',
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
