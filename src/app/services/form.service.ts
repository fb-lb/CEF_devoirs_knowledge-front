import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  /**
   * Used to display form errors in templates
   * @function isInputValid
   * 
   * @param {FormGroup} form - The FormGroup containing the control to check
   * @param {string} inputName - The control name to retrieve in the FormGroup 
   * 
   * @returns {boolean} Returns `true` if the control to check is invalid and has been touched by the user
   * else it returns `false`.
   */
  isInputValid(form: FormGroup, inputName: string):boolean {
    const inputField = form.get(inputName);
    const result = inputField && inputField.invalid && (!inputField.pristine || inputField.touched);
    return !!result;
  }

  /**
   * Used in template to retrieve all field errors in form for a specific field.
   * 
   * @function getAllErrorMessages
   * 
   * @param {FormGroup} form - The FormGroup containing the control to check
   * @param {string} inputName - The control name to retrieve in the FormGroup 
   * 
   * @returns {string[]} Returns a list of messages related to field errors.
   */
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
      if (inputField?.errors?.['lowercase']) {
        messages.push('Au moins une lettre minuscule est requise.');
      }
      if (inputField?.errors?.['uppercase']) {
        messages.push('Au moins une lettre majuscule est requise.');
      }
      if (inputField?.errors?.['digit']) {
        messages.push('Au moins un chiffre est requis.');
      }
      if (inputField?.errors?.['special']) {
        messages.push('Au moins un caractère spécial est requis (* $ % ! § - + & #).');
      }
      if (inputField?.errors?.['invalid']) {
        messages.push('Les caractères autorisés sont seulement les lettres (minuscule/majuscule), les chiffres et ces caractères : * $ % ! § - + & #.');
      }
    }
    return messages;
  }
}
