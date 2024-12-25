import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TimeOption } from '../../_features/new-service/_interfaces/time-stamp.interface';

interface DurationForm {
  hours: FormControl<TimeOption | null>;
  minutes: FormControl<TimeOption | null>;
}

export function durationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const groups = control as FormGroup<DurationForm>;

    const hours = groups.value.hours;
    const minutes = groups.value.minutes;

    if (hours && minutes) {
      if (hours.value === 0 && minutes.value === 0) {
        return { invalidDuration: true };
      }
    }

    return null;
  };
}
