import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import {Formvalidators} from '../../../../../shared/validators/form-validators';
import {ProfileRequest} from '../../../../../core/domain/dtos/resquests/profile.request';
@Injectable({
  providedIn: "root"
})
export class FormRegistrarConfig {

  public readonly NUMBER_DIGITS_DNI = 8;
  public readonly NUMBER_DIGITS_OTHER_DOCUMENT = 20;

  public formulario!: FormGroup;
  get idUser(): AbstractControl | null { return this.formulario.get('idUser'); }
  get email(): AbstractControl | null { return this.formulario.get('email'); }
  get typeDocument(): AbstractControl | null { return this.formulario.get('typeDocument'); }
  get fullName(): AbstractControl | null { return this.formulario.get('fullName'); }
  get document(): AbstractControl | null { return this.formulario.get('document'); }
  get phone(): AbstractControl | null { return this.formulario.get('phone'); }
  get address(): AbstractControl | null { return this.formulario.get('address'); }

  constructor(
    private formBuilder: FormBuilder,
    private util: Formvalidators,
  ) { }

  configForm() {
    this.formulario = this.formBuilder.group({
      // PERSON
      typeDocument: [null,
        [this.util.requiredValidator("Tipo de documento requerido"),
        ]],
      document: [null, [
        this.util.requiredValidator("Número de documento requerido"),
        this.documentValidators(),
      ]],
      fullName: [null, [
        this.util.requiredValidator("Nombre completo requerido"),
        this.util.maxlengthValidator(255, "El máximo número de caracteres es 255"),
        this.util.onlyLettersAndSpaces("Nombre Completo")
      ]],
      phone: [null, [
        this.util.maxlengthValidator(50, "El máximo número de caracteres es 50"),
      ]],
      address: [null, [
        this.util.maxlengthValidator(255, "El máximo número de caracteres es 255"),
      ]],

      // USER
      idUser: [null],
      email: [null, [
        this.util.requiredValidator("Correo requerido"),
        this.util.emailValidator("Correo inválido"),
        this.util.maxlengthValidator(100, "El máximo número de caracteres es 100"),
      ]],
    });
  }

  documentValidators() {
    return (control: AbstractControl): { [key: string]: string } | null => {
      const value = control.value?.toString() || '';
      const typeDocument = control.parent?.get('typeDocument')?.value;

      // Si es DNI (ej: 1)
      if (typeDocument === 1) {
        // Validar que solo tenga números
        const numericError = this.util.onlyNumber("N° de documento")(control as any);
        if (numericError) {
          return numericError;
        }

        // Validar que tenga exactamente 8 dígitos
        if (value && value.length !== this.NUMBER_DIGITS_DNI) {
          return { required: "El N° de documento debe tener exactamente 8 dígitos" };
        }
      } else {
        // Para otros documentos → máximo 20 caracteres
        const maxlengthError = this.util.maxlengthValidator(
          this.NUMBER_DIGITS_OTHER_DOCUMENT,
          "El N° de documento no debe superar los 20 caracteres"
        )(control as any);

        if (maxlengthError) {
          return maxlengthError;
        }
      }

      return null;
    };
  }

  assignModel(): ProfileRequest {
    return this.formulario.getRawValue() as ProfileRequest;
  }

}
