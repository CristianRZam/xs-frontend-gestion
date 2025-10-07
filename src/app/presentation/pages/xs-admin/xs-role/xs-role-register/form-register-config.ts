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
  get name(): AbstractControl | null { return this.formulario.get('name'); }
  get description(): AbstractControl | null { return this.formulario.get('description'); }

  constructor(
    private formBuilder: FormBuilder,
    private util: Formvalidators,
  ) { }

  configForm() {
    this.formulario = this.formBuilder.group({
      id: [null],
      name: [null, [
        this.util.requiredValidator("Nombre Requerido"),
        this.util.maxlengthValidator(255, "El máximo número de caracteres es 255"),
      ]],
      description: [null, [
        this.util.maxlengthValidator(255, "El máximo número de caracteres es 255"),
      ]],
    });
  }


  assignModel(): RoleModel {
    return this.formulario.getRawValue() as RoleModel;
  }

}
