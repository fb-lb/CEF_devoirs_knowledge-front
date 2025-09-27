import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../core/models/api-response.model';


@Component({
  selector: 'app-email-check',
  imports: [RouterLink],
  templateUrl: './email-check.html',
  styleUrl: './email-check.scss'
})
export class EmailCheck {
  private token!: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  async ngOnInit() {
    this.token = this.activatedRoute.snapshot.params['token'];
    try {
      const response = await firstValueFrom(this.http.post<ApiResponse>(environment.backUrl + '/api/inscription/check-email', { token : this.token }, { withCredentials: true }));
      this.router.navigate(['/'], {
        queryParams: {
          success: response.success,
          message: response.message,
        }
      });
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const response = error.error as ApiResponse;
        this.router.navigate(['/'], {
          queryParams: {
            success: response.success,
            message: response.message ?? "Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.",
          }
        })
        console.error(error);
        // add external service like Sentry to save the error
      }
    }
  }
}
