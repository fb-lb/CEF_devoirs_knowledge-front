import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/models/api-response.model';
import { RouterLink } from '@angular/router';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  constructor(private http: HttpClient, public formService: FormService) {}
  formError: string = '';
  formSuccess: string = '';

  //---------------
  // FORM PART
  //---------------

  // If you modify one of these validator, make sure that back end User.ts (in models) and registration validators (in form.service.ts) are also modified
  form = new FormGroup({
    firstName: new FormControl('John', [
      Validators.required,
      Validators.maxLength(60),
      Validators.pattern(/^[a-zA-Zéèêàîùôçïäâëüöœ '\-\.]*$/),
    ]),
    lastName: new FormControl('Doe', [
      Validators.required,
      Validators.maxLength(60),
      Validators.pattern(/^[a-zA-Zéèêàîùôçïäâëüöœ '\-\.]*$/),
    ]),
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
    confirmPassword: new FormControl('00000000', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
  });

  async onSubmit() {
    this.form.markAllAsTouched(); // if a user try to send without touching a field, required mention will appear
    this.formSuccess = '';
    if (this.form.valid) {
      this.formError = '';
      try {
        const passwordValue = this.form.get('password')?.value;
        const confirmPasswordValue = this.form.get('confirmPassword')?.value;

        if (passwordValue !== confirmPasswordValue) {
          this.formError = 'Les deux mots de passe doivent être identiques.';
          return;
        }
        const response = await firstValueFrom(
          this.http.post<ApiResponse>(environment.backUrl + '/api/inscription', this.form.value, {
            withCredentials: true,
          })
        );
        this.formSuccess = response.message;
        this.form.reset();
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
