import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import {Formvalidators} from '../../../../../shared/validators/form-validators';
import {ProductRequest} from '../../../../../core/domain/dtos/resquests/product.request';

@Injectable({
  providedIn: "root"
})
export class FormRegisterConfig {

  public formulario!: FormGroup;
  get id(): AbstractControl | null { return this.formulario.get('id'); }
  get code(): AbstractControl | null { return this.formulario.get('code'); }
  get name(): AbstractControl | null { return this.formulario.get('name'); }
  get description(): AbstractControl | null { return this.formulario.get('description'); }
  get categoryId(): AbstractControl | null { return this.formulario.get('categoryId'); }
  get unitMeasureId(): AbstractControl | null { return this.formulario.get('unitMeasureId'); }
  get valuationMethodId(): AbstractControl | null { return this.formulario.get('valuationMethodId'); }
  get basePrice(): AbstractControl | null { return this.formulario.get('basePrice'); }
  get promoPrice(): AbstractControl | null { return this.formulario.get('promoPrice'); }
  get baseCost(): AbstractControl | null { return this.formulario.get('baseCost'); }

  constructor(
    private formBuilder: FormBuilder,
    private util: Formvalidators,
  ) { }

  configForm() {
    this.formulario = this.formBuilder.group({
      id: [null],
      code: [null,
        [this.util.requiredValidator("Código requerido"),
          this.util.maxlengthValidator(50, "El máximo número de caracteres es 50")
        ]],
      name: [null, [
        this.util.requiredValidator("Nombre requerido"),
        this.util.maxlengthValidator(255, "El máximo número de caracteres es 255")
      ]],
      description: [null, [
        this.util.requiredValidator("Descripción requerido")
      ]],
      categoryId: [null, [
        this.util.requiredValidator("Categoría requerida"),
      ]],
      unitMeasureId: [null, [
        this.util.requiredValidator("Unidad de medida requerida"),
      ]],
      valuationMethodId: [null, [
        this.util.requiredValidator("Método de valuación requerida"),
      ]],
      basePrice: [null, [
        this.util.requiredValidator("Precio de venta base requerida"),
      ]],

      promoPrice: [null],

      baseCost: [null,
        [this.util.requiredValidator("Precio de costo base requerido"),
        ]],
    });
  }


  assignModel(): ProductRequest {
    return this.formulario.getRawValue() as ProductRequest;
  }

}
