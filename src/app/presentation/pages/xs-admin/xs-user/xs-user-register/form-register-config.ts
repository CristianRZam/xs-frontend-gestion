import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import {Formvalidators} from '../../../../../shared/validators/form-validators';
import {RoleModel} from '../../../../../core/domain/models/role.model';
@Injectable({
  providedIn: "root"
})
export class FormRegistrarConfig {

  public formulario!: FormGroup;
  get id(): AbstractControl | null { return this.formulario.get('id'); }
  get username(): AbstractControl | null { return this.formulario.get('username'); }
  get email(): AbstractControl | null { return this.formulario.get('email'); }
  get typeDocument(): AbstractControl | null { return this.formulario.get('typeDocument'); }
  get document(): AbstractControl | null { return this.formulario.get('document'); }
  get fullName(): AbstractControl | null { return this.formulario.get('fullName'); }
  get phone(): AbstractControl | null { return this.formulario.get('phone'); }
  get address(): AbstractControl | null { return this.formulario.get('address'); }

  constructor(
    private formBuilder: FormBuilder,
    private util: Formvalidators,
  ) { }

  configForm() {
    this.formulario = this.formBuilder.group({
      // USER
      id: [null],
      username: [null, [
        this.util.requiredValidator("Nombre de usuario requerido"),
        this.util.maxlengthValidator(50, "El máximo número de caracteres es 50"),
      ]],
      email: [null, [
        this.util.requiredValidator("Correo requerido"),
        this.util.emailValidator("Correo inválido"),
        this.util.maxlengthValidator(100, "El máximo número de caracteres es 100"),
      ]],
      password: [null, [
        this.util.requiredValidator("Contraseña requerida"),
        this.util.minlengthValidator(6, "La contraseña debe tener al menos 6 caracteres"),
      ]],
      active: [true],

      // PERSON
      typeDocument: [null,
      [this.util.requiredValidator("Tipo de documento requerido"),]],
      document: [null, [
        this.util.requiredValidator("Número de documento requerido"),
        this.util.maxlengthValidator(20, "El máximo número de caracteres es 20"),
      ]],
      fullName: [null, [
        this.util.requiredValidator("Nombre completo requerido"),
        this.util.maxlengthValidator(255, "El máximo número de caracteres es 255"),
      ]],
      phone: [null, [
        this.util.maxlengthValidator(50, "El máximo número de caracteres es 50"),
      ]],
      address: [null, [
        this.util.maxlengthValidator(255, "El máximo número de caracteres es 255"),
      ]],
    });
  }



  assignModel(): RoleModel {
    return this.formulario.getRawValue() as RoleModel;
  }

  formSubmitEvent(): { error: boolean, mensaje?: string } {
    if (this.formulario.valid) {
      return { error: false };
    } else {
      Object.keys(this.formulario.controls).forEach((field: any) => {
        let control: any = this.formulario.get(field);
        control?.markAsTouched({ onlySelf: true });
        if(control.controls) {
          Object.keys(control.controls).forEach((subField: any) => {
            control = this.formulario.get(field)!.get(subField);
            control?.markAsTouched({ onlySelf: true });
          });
        }
      });
      return { error: true, mensaje: this.util.obtenerPrimerMensajeErrorFormulario(this.formulario) }
    }
  }
}
