import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const today = new Date();
    const selectedDate = new Date(control.value);

    return selectedDate >= today ? null : { futureDate: true };
  };
}
