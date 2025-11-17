import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';
import {ProductRequest} from '../../../../../core/domain/dtos/resquests/product.request';
import {FormRegisterConfig} from './form-register-config';
import {Formvalidators} from '../../../../../shared/validators/form-validators';
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';
import {ProductFormResponse} from '../../../../../core/domain/dtos/responses/product-form.response';
import {ReactiveFormsModule} from '@angular/forms';
import {XsDialog} from '../../../../../shared/components/xs-dialog/xs-dialog';
import {XsInputText} from '../../../../../shared/components/xs-input-text/xs-input-text';
import {XsSelect} from '../../../../../shared/components/xs-select/xs-select';
import {XsInputNumber} from '../../../../../shared/components/xs-input-number/xs-input-number';
import {XsEditor} from '../../../../../shared/components/xs-editor/xs-editor';
import {XsUpload} from '../../../../../shared/components/xs-upload/xs-upload';

@Component({
  selector: 'xs-product-register',
  imports: [
    ReactiveFormsModule,
    XsDialog,
    XsInputText,
    XsInputNumber,
    XsSelect,
    XsToast,
    XsEditor,
    XsUpload
  ],
  templateUrl: './xs-product-register.html',
  styleUrl: './xs-product-register.scss'
})
export class XsProductRegister implements OnInit {
  @ViewChild('xsToastRegister') private toast!: XsToast;

  @Output() onCreate: EventEmitter<ProductRequest> = new EventEmitter();
  @Output() onUpdate: EventEmitter<ProductRequest> = new EventEmitter();


  dialogModel: { header?: string, display?: boolean, showOkButton?: boolean } = { header: '', display: false, showOkButton: true };
  public opcion: '' | 'AGREGAR' | 'MODIFICAR' = '';
  public productRequest: ProductRequest = {};

  public constructor(
    public formConfig: FormRegisterConfig,
    private util: Formvalidators,
  ) {
  }

  public categories: ParameterModel[] = [];
  public unitMeasures: ParameterModel[] = [];
  public valuationMethods: ParameterModel[] = [];

  ngOnInit(): void {
    this.formConfig.configForm();
  }

  openDialog(opcion: 'AGREGAR' | 'MODIFICAR' = 'AGREGAR', header: string = 'Registrar Producto', item: ProductFormResponse | null = null) {
    this.opcion = opcion;
    this.dialogModel.header = header;

    this.formConfig.formulario.reset();
    this.formConfig.configForm();

    if (item?.product && opcion === 'MODIFICAR') {
      this.formConfig.formulario.patchValue({
        id: item.product.id,
        code: item.product.code,
        name: item.product.name,
        description: item.product.description,
        categoryId: item.product.categoryId,
        unitMeasureId: item.product.unitMeasureId,
        valuationMethodId: item.product.valuationMethodId,
        basePrice: item.product.basePrice,
        promoPrice: item.product.promoPrice,
        baseCost: item.product.baseCost,
      });
    }

    // --- Filtrado de categorias ---
    const productCategoryId = item?.product?.categoryId;

    // 1. Categiras activas y no eliminados
    const categoriesDisponibles = item?.categories?.filter(d => !d.deleted && d.active) ?? [];

    // 2. Categoria eliminado/inactivo que el producto tiene asignado
    const categoryAsignadoNoDisponible = item?.categories?.filter(
      d => d.parameterId === productCategoryId && (d.deleted || !d.active)
    ) ?? [];

    // 3. Unir ambos para mostrarlo correctamente
    this.categories = [...categoriesDisponibles, ...categoryAsignadoNoDisponible];



    // --- Filtrado de Unidad de medida ---
    const productUnitMeasureId = item?.product?.unitMeasureId;

    // 1. Unidad de medida activas y no eliminados
    const unitMeasuresDisponibles = item?.unitMeasures?.filter(d => !d.deleted && d.active) ?? [];

    // 2. Unidad de medida eliminado/inactivo que el producto tiene asignado
    const unitMeasureAsignadoNoDisponible = item?.unitMeasures?.filter(
      d => d.parameterId === productCategoryId && (d.deleted || !d.active)
    ) ?? [];

    // 3. Unir ambos para mostrarlo correctamente
    this.unitMeasures = [...unitMeasuresDisponibles, ...unitMeasureAsignadoNoDisponible];


    // --- Filtrado de Medtodo de valuación ---
    const productValuationMethodId = item?.product?.valuationMethodId;

    // 1. Medtodo de valuación activas y no eliminados
    const valuationMethodsDisponibles = item?.valuationMethods?.filter(d => !d.deleted && d.active) ?? [];

    // 2. Medtodo de valuación eliminado/inactivo que el producto tiene asignado
    const valuationMethodAsignadoNoDisponible = item?.valuationMethods?.filter(
      d => d.parameterId === productValuationMethodId && (d.deleted || !d.active)
    ) ?? [];

    // 3. Unir ambos para mostrarlo correctamente
    this.valuationMethods = [...valuationMethodsDisponibles, ...valuationMethodAsignadoNoDisponible];

    this.dialogModel.display = true;
  }




  cerrarDialog() {
    this.opcion = '';
    this.dialogModel.display = false;
  }

  onAceptarDialog() {
    this.formSubmitEvent();
  }

  formSubmitEvent(): void {
    let event = this.util.formSubmitEvent(this.formConfig.formulario);
    if(event.error) {
      this.toast.show(event.mensaje!, 'error', "Rol");
    }else {
      switch (this.opcion) {
        case 'AGREGAR':
          this.agregar();
          break;
        case 'MODIFICAR':
          this.modificar();
          break;
      }
    }
  }

  agregar() {
    this.productRequest = this.formConfig.assignModel();
    this.onCreate.emit(this.productRequest);
  }

  modificar() {
    this.productRequest = this.formConfig.assignModel();
    this.onUpdate.emit(this.productRequest);
  }
}
