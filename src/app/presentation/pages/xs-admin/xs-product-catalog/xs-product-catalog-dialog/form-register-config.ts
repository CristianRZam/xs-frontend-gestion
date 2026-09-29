import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { Formvalidators } from '../../../../../shared/validators/form-validators';
import { CatalogConfigRequest } from '../../../../../core/domain/dtos/resquests/catalog-config.request';

@Injectable({
  providedIn: "root"
})
export class FormRegisterConfig {

  public formulario!: FormGroup;

  get id(): AbstractControl | null { return this.formulario.get('id'); }
  get name(): AbstractControl | null { return this.formulario.get('name'); }
  get viewMode(): AbstractControl | null { return this.formulario.get('viewMode'); }
  get columns(): AbstractControl | null { return this.formulario.get('columns'); }
  get productsPerPage(): AbstractControl | null { return this.formulario.get('productsPerPage'); }

  get showCover(): AbstractControl | null { return this.formulario.get('showCover'); }
  get showHeader(): AbstractControl | null { return this.formulario.get('showHeader'); }

  get showImage(): AbstractControl | null { return this.formulario.get('showImage'); }
  get showCode(): AbstractControl | null { return this.formulario.get('showCode'); }
  get showDescription(): AbstractControl | null { return this.formulario.get('showDescription'); }
  get showPrice(): AbstractControl | null { return this.formulario.get('showPrice'); }
  get showPricePromo(): AbstractControl | null { return this.formulario.get('showPricePromo'); }
  get showStatus(): AbstractControl | null { return this.formulario.get('showStatus'); }
  get cardBorder(): AbstractControl | null { return this.formulario.get('cardBorder'); }

  get showFooter(): AbstractControl | null { return this.formulario.get('showFooter'); }
  get showPageNumber(): AbstractControl | null { return this.formulario.get('showPageNumber'); }
  get coverImage(): AbstractControl | null { return this.formulario.get('coverImage'); }
  get headerImage(): AbstractControl | null { return this.formulario.get('headerImage'); }
  get active(): AbstractControl | null {  return this.formulario.get('active'); }


  constructor(
    private formBuilder: FormBuilder,
    private util: Formvalidators
  ) {}

  configForm() {
    this.formulario = this.formBuilder.group({
      id: [-1],

      name: [
        'Catálogo predeterminado',
        [
          this.util.requiredValidator('Nombre requerido'),
          this.util.maxlengthValidator(
            100,
            'El máximo número de caracteres es 100'
          )
        ]
      ],

      viewMode: [
        'GRID',
        [
          this.util.requiredValidator(
            'Modo de visualización requerido'
          )
        ]
      ],

      columns: [
        3,
        [
          this.util.requiredValidator(
            'Nº de columnas requerido'
          ),
          this.util.minNumberValidator(
            1,
            'El mínimo es 1'
          ),
          this.util.maxNumberValidator(
            4,
            'El máximo es 4'
          )
        ]
      ],

      productsPerPage: [
        12,
        [
          this.util.requiredValidator(
            'Productos por página requerido'
          ),
          this.util.minNumberValidator(
            1,
            'El mínimo es 1'
          ),
          this.util.maxNumberValidator(
            50,
            'El máximo es 50'
          )
        ]
      ],

      // PORTADA
      showCover: [true],
      coverImage: [null],

      // ENCABEZADO
      showHeader: [true],
      headerImage: [null],

      // CONTENIDO
      showImage: [true],
      showCode: [true],
      showDescription: [true],
      showPrice: [true],
      showPricePromo: [true],
      showStatus: [true],
      cardBorder: [false],

      // PIE DE PÁGINA
      showFooter: [true],
      showPageNumber: [true],

      // ESTADO
      active: [true]
    });
  }

  assignModel(): CatalogConfigRequest {
    return this.formulario.getRawValue() as CatalogConfigRequest;
  }
}
