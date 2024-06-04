import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//Esta expresión regular validará si el texto contiene al menos una minuscula, mayuscula, número, symbolo y que la longitud sea mayor o igual a 8
const patternPassword = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8}');
export const customPasswordValidator = (control: AbstractControl<string>): ValidationErrors | null => {
  const value = control.value;
  console.log(value, patternPassword.test(value));


  if (!patternPassword.test(value)) {
    return { customPasswordValidator: true };
  }

  return null;
}

//-------------------CROSS VALIDATOR---------------------------
export const customPasswordMatchingValidator: ValidatorFn = (
  formGroupControl: AbstractControl<{ password: string, confirmPassword: string }>
  ): ValidationErrors | null => {
    const password = formGroupControl.value.password;
    const confirmPassword = formGroupControl.value.confirmPassword;

    return password !== confirmPassword ? { crossConfirmPasswordError: true } : null;
}
