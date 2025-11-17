import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';
import {ProductViewRequest} from '../../../../../core/domain/dtos/resquests/product-view.request';
import {XsFieldset} from '../../../../../shared/components/xs-fieldset/xs-fieldset';
import {XsFilterButtons} from '../../../../../shared/components/xs-filter-buttons/xs-filter-buttons';
import {XsInputText} from '../../../../../shared/components/xs-input-text/xs-input-text';
import {XsMultiselect} from '../../../../../shared/components/xs-multiselect/xs-multiselect';
import {XsSelect} from '../../../../../shared/components/xs-select/xs-select';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {XsInputNumber} from '../../../../../shared/components/xs-input-number/xs-input-number';

@Component({
  selector: 'xs-product-filter',
  imports: [
    XsFieldset,
    XsFilterButtons,
    XsInputText,
    XsMultiselect,
    XsSelect,
    XsInputNumber
  ],
  templateUrl: './xs-product-filter.html',
  styleUrl: './xs-product-filter.scss'
})
export class XsProductFilter implements OnInit {
  @Output() filter: EventEmitter<ProductViewRequest> = new EventEmitter<ProductViewRequest>();

  @Input() categoriesData: ParameterModel [] = [];
  @Input() unitMeasuresData: ParameterModel [] = [];
  @Input() valuationMethodsData: ParameterModel [] = [];

  public formulario!: FormGroup;

  public statusOptions = [
    { label: 'Habilitado', value: true, active: true },
    { label: 'Inhabilitado', value: false, active: true }
  ];

  public manageVariantsOptions = [
    { label: 'Con Variante', value: true, active: true },
    { label: 'Sin Variante', value: false, active: true }
  ];

  get code(): AbstractControl | null { return this.formulario.get('code'); }
  get name(): AbstractControl | null { return this.formulario.get('name'); }
  get description(): AbstractControl | null { return this.formulario.get('description'); }
  get categories(): AbstractControl | null { return this.formulario.get('categories'); }
  get unitMeasures(): AbstractControl | null { return this.formulario.get('unitMeasures'); }
  get manageVariant(): AbstractControl | null { return this.formulario.get('manageVariant'); }
  get minimumStock(): AbstractControl | null { return this.formulario.get('minimumStock'); }
  get maximumStock(): AbstractControl | null { return this.formulario.get('maximumStock'); }
  get status(): AbstractControl | null { return this.formulario.get('status'); }
  get valuationMethods(): AbstractControl | null { return this.formulario.get('valuationMethods'); }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.configForm();
  }

  private configForm(): void {
    this.formulario = this.formBuilder.group({
      code: [null],
      name: [null],
      description: [null],
      categories: [null],
      unitMeasures: [null],
      manageVariant: [null],
      minimumStock: [null],
      maximumStock: [null],
      status: [null],
      valuationMethods: [null],
    });
  }

  onClickFilter(): void {
    const request: ProductViewRequest = {
      code: this.formulario.value.code,
      name: this.formulario.value.name,
      description: this.formulario.value.description,
      categories: this.formulario.value.categories || [],
      unitMeasures: this.formulario.value.unitMeasures || [],
      valuationMethods: this.formulario.value.valuationMethods || [],
      manageVariant: this.formulario.value.manageVariant !== null ? this.formulario.value.manageVariant : undefined,
      minimumStock: this.formulario.value.minimumStock,
      maximumStock: this.formulario.value.maximumStock,
      status: this.formulario.value.status !== null ? this.formulario.value.status : undefined,
      page: 0,
      size: 5
    };

    this.filter.emit(request);
  }

  onClickClear(): void {
    this.formulario.reset();

    const request: ProductViewRequest = {
      page: 0,
      size: 5
    };

    this.filter.emit(request);
  }

}
