import { FormGroup, ValidatorFn, Validators } from '@angular/forms';

export function datesRangeValidator(): ValidatorFn {
  return (form: FormGroup): Validators | null => {
    const dateFrom = new Date(form.get('dateFrom').value);
    const dateTo = new Date(form.get('dateTo').value);

    if (dateFrom.getFullYear() !== 1970 && dateTo.getFullYear() !== 1970) {
      const isRangeValid = dateTo?.getDate() - dateFrom?.getDate() > 0;
      return isRangeValid ? null : { invalidDateRange: true };
    } else if (
      dateFrom.getFullYear() === 1970 &&
      dateTo.getFullYear() === 1970
    ) {
      form.get('dateFrom').addValidators(Validators.required);
      form.get('dateTo').addValidators(Validators.required);
    }

    return null;
  };
}
