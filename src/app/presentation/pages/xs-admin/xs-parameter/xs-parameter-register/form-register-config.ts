import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import { Formvalidators } from '../../../../../shared/validators/form-validators';
import { ParameterModel } from '../../../../../core/domain/models/parameter.model';

@Injectable({
  providedIn: "root"
})
export class FormRegisterConfig {

  public formulario!: FormGroup;

  get id(): AbstractControl | null { return this.formulario.get('id'); }
  get parameterId(): AbstractControl | null { return this.formulario.get('parameterId'); }
  get parentParameterId(): AbstractControl | null { return this.formulario.get('parentParameterId'); }
  get code(): AbstractControl | null { return this.formulario.get('code'); }
  get type(): AbstractControl | null { return this.formulario.get('type'); }
  get name(): AbstractControl | null { return this.formulario.get('name'); }
  get shortName(): AbstractControl | null { return this.formulario.get('shortName'); }
  get orderNumber(): AbstractControl | null { return this.formulario.get('orderNumber'); }

  constructor(
    private formBuilder: FormBuilder,
    private util: Formvalidators,
  ) { }

  configForm() {
    this.formulario = this.formBuilder.group({
      id: [null],
      parameterId: [null],
      code: [null, [
        this.util.requiredValidator("Código de parámetro requerido"),
        this.util.maxlengthValidator(255, "El máximo número de caracteres es 255"),
      ]],
      type: [null, [
        this.util.requiredValidator("Tipo de parámetro requerido"),
        this.util.onlyNumber("El valor seleccionado no es un número."),
      ]],
      name: [null, [
        this.dynamicNameValidator()
      ]],
      shortName: [null, [
        this.util.maxlengthValidator(255, "El máximo número de caracteres es 255"),
      ]],
      orderNumber: [null, [
        this.util.requiredValidator("Orden del parámetro requerido"),
        this.util.onlyNumber("El valor seleccionado no es un número."),
      ]],
    });
  }

  dynamicNameValidator() {
    return (control: AbstractControl): { [key: string]: string } | null => {
      const value = control.value;
      const type = control.parent?.get('type')?.value;

      if (type === 1) {
        if (!value) {
          return { required: "Archivo requerido" };
        }
      } else {
        if (!value) {
          return { required: "Nombre requerido" };
        }
        if (value.length > 255) {
          return { maxlength: "El máximo número de caracteres es 255" };
        }
      }

      return null;
    };
  }

  assignModel(): ParameterModel {
    return this.formulario.getRawValue() as ParameterModel;
  }

}
