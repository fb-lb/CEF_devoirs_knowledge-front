import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidators {
  static neededCaracters(control: AbstractControl): ValidationErrors | null {
    const value = control.value ?? '';

    const errors: ValidationErrors = {};

    if(value && !/[a-z]/.test(value)) {
      errors['lowercase'] = true;
    }

    if(value && !/[A-Z]/.test(value)) {
      errors['uppercase'] = true;
    }

    if(value && !/[0-9]/.test(value)) {
      errors['digit'] = true;
    }

    if(value && !/[*$%!§\-+&#]/.test(value)) {
      errors['special'] = true;
    }
    return Object.keys(errors).length ? errors : null;
  }

  static invalidCaracters(control: AbstractControl): ValidationErrors | null {
    const value = control.value ?? '';
    const errors: ValidationErrors = {};

    if(value && !/^[a-zA-Z0-9À-ÖØ-öø-ÿŒœ*$%!§\-+&#]*$/.test(value)) {
      errors['invalid'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }
}