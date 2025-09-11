import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  
  constructor(private http: HttpClient) {}
  formError: string = '';

  //---------------
  // FORM PART
  //---------------

   form = new FormGroup({
    firstName: new FormControl('John', [
      Validators.required,
      Validators.maxLength(60),
      Validators.pattern('[a-zA-Zéèêàîùôçïäâëüöœ -]*'),
    ]),
    lastName: new FormControl('Doe', [
      Validators.required,
      Validators.maxLength(60),
      Validators.pattern('[a-zA-Zéèêàîùôçïäâëüöœ -]*'),
    ]),
    email: new FormControl('fb.lubre@free.fr', [
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

   // Function used in template to display form errors
   isInputValid(inputName: string):boolean {
    const inputField = this.form.get(inputName);
    const result = inputField && inputField.invalid && (!inputField.pristine || inputField.touched);
    return !!result;
   }

   // Used in template to retrieve all field errors in form
   getAllErrorMessages(inputName: string): string[] {
    const inputField = this.form.get(inputName);
    const messages: string[] = [];

    if (this.isInputValid(inputName)) {
      if (inputField?.errors?.['required']) {
        messages.push('Ce champ est obligatoire');
      }
      if (inputField?.errors?.['maxlength']) {
        messages.push(`Maximum ${inputField.errors['maxlength'].requiredLength} caractères.`);
      }
      if (inputField?.errors?.['minlength']) {
        messages.push(`Minimum ${inputField.errors['minlength'].requiredLength} caractères.`);
      }
      if (inputField?.errors?.['pattern']) {    
        messages.push('Caractères non autorisés.')
      }
      if (inputField?.errors?.['email']) {
        messages.push('Format e-mail nécessaire.')
      }
    }
    return messages;
   } 

   async onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.formError = "";
      try {
        const passwordValue = this.form.get('password')?.value;
        const confirmPasswordValue = this.form.get('confirmPassword')?.value;
        
        if (passwordValue !== confirmPasswordValue) {
          this.formError = 'Les deux mots de passe doivent être identiques.';
          return
        }
        const reponse = await firstValueFrom(this.http.post('http://', this.form.value));
      } catch (error) {
        console.error('Erreur : ', error); // add external service like Sentry to save the error
      }
    }
   }

}
