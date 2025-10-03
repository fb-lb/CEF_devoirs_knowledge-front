import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  // Function used in template to display form errors
  isInputValid(form: FormGroup, inputName: string):boolean {
    const inputField = form.get(inputName);
    const result = inputField && inputField.invalid && (!inputField.pristine || inputField.touched);
    return !!result;
  }

  // Used in template to retrieve all field errors in form
  getAllErrorMessages(form: FormGroup, inputName: string): string[] {
    const inputField = form.get(inputName);
    const messages: string[] = [];

    if (this.isInputValid(form, inputName)) {
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
      if (inputField?.errors?.['min']) {
        messages.push(`La valeur doit être supérieure ou égale à ${inputField.errors['min'].min}.`)
      }
    }
    return messages;
  }
}
