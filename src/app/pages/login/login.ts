import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormService } from '../../services/form.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/models/api-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(public formService: FormService, private http: HttpClient, private router: Router) {}
  formError: string = '';

  // --------------
  // FORM PART
  // --------------

  // If you modify one of these validator, make sure that back end login validators (in form.service.ts) are also modified
  form = new FormGroup({
    email: new FormControl('john.doe@test.com', [
      Validators.required,
      Validators.email,
      Validators.maxLength(80),
    ]),
    password: new FormControl('00000000', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
  });

  async onSubmit() {
    this.form.markAllAsTouched(); // if a user try to send without touching a field, required mention will appear
    if (this.form.valid) {
      this.formError = '';
      try {
        await firstValueFrom(
          this.http.post(environment.backUrl + '/api/authentification/connexion', this.form.value, {
            withCredentials: true,
          })
        );
        this.router.navigate(['/']);
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          const response = error.error as ApiResponse;
          response.message
            ? (this.formError = response.message)
            : (this.formError =
                "Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.");
        } else {
          this.formError =
            "Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.";
          console.error(error);
          // add external service like Sentry to save the error
        }
      }
    }
  }
}
