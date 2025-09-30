import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from "@angular/forms";
import { Formvalidators } from '../../../../../shared/validators/form-validators';
import { PasswordRequest } from '../../../../../core/domain/dtos/resquests/password.request';

@Injectable({
  providedIn: "root"
})
export class FormRegisterConfig {

  public formulario!: FormGroup;
  get oldPassword(): AbstractControl | null { return this.formulario.get('oldPassword'); }
  get newPassword(): AbstractControl | null { return this.formulario.get('newPassword'); }
  get confirmationPassword(): AbstractControl | null { return this.formulario.get('confirmationPassword'); }

  constructor(
    private formBuilder: FormBuilder,
    private util: Formvalidators,
  ) { }

  configForm() {
    this.formulario = this.formBuilder.group({
      oldPassword: [null, [
        this.util.requiredValidator("La contraseña actual es obligatoria"),
      ]],
      newPassword: [null, [
        this.util.requiredValidator("La contraseña nueva es obligatoria"),
        this.util.password("La contraseña nueva ")
      ]],
      confirmationPassword: [null, [
        this.util.requiredValidator("La confirmación de la contraseña es obligatoria"),
      ]],
    }, {
      validators: [this.passwordsMatchValidator()]
    });
  }

  /** Valida que la nueva contraseña y la confirmación coincidan */
  /** Valida que la nueva contraseña y la confirmación coincidan */
  private passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      const newPasswordControl = group.get('newPassword');
      const confirmationPasswordControl = group.get('confirmationPassword');

      if (
        newPasswordControl &&
        confirmationPasswordControl &&
        newPasswordControl.value !== confirmationPasswordControl.value
      ) {
        confirmationPasswordControl.setErrors({
          passwordMismatch: "La confirmación de la contraseña no coincide con la nueva contraseña"
        });
      } else {
        // Limpia el error si coincide
        if (confirmationPasswordControl?.hasError('passwordMismatch')) {
          confirmationPasswordControl.setErrors(null);
        }
      }

      return null; // ya no devolvemos error en el form, lo ponemos en el control
    };
  }


  assignModel(): PasswordRequest {
    return this.formulario.getRawValue() as PasswordRequest;
  }
}
