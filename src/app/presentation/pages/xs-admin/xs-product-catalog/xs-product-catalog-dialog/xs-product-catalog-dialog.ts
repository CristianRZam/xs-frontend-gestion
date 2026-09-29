import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { XsDialog } from '../../../../../shared/components/xs-dialog/xs-dialog';
import { XsSelect } from '../../../../../shared/components/xs-select/xs-select';
import { XsInputText } from '../../../../../shared/components/xs-input-text/xs-input-text';
import { XsInputNumber } from '../../../../../shared/components/xs-input-number/xs-input-number';
import { XsButton } from '../../../../../shared/components/xs-button/xs-button';

import { FormRegisterConfig } from './form-register-config';

import { CatalogConfigService } from '../../../../../infraestructure/api/catalogconfig.service';
import { CatalogConfigDTO } from '../../../../../core/domain/dtos/responses/catalog-config-dto';
import {CatalogConfigRequest} from '../../../../../core/domain/dtos/resquests/catalog-config.request';

@Component({
  selector: 'xs-product-catalog-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    XsDialog,
    XsSelect,
    XsInputText,
    XsInputNumber,
    XsButton
  ],
  templateUrl: './xs-product-catalog-dialog.html',
  styleUrl: './xs-product-catalog-dialog.scss'
})
export class XsProductCatalogDialog implements OnInit {

  @Output() onSave = new EventEmitter<any>();
  @Output() onGenerate = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<number>();

  @Input() configurations: CatalogConfigDTO[] = [];
  coverImageFile?: File;
  headerImageFile?: File;

  dialogModel = {
    header: 'Configuración del catálogo',
    display: false,
    showOkButton: true
  };

  selectedConfigId = -1;

  currentPreviewPage: 'cover' | 'products' = 'cover';

  coverImage =
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop';

  headerImage =
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop';

  viewModes = [
    { id: 'GRID', name: 'Cuadrícula', active: true },
    { id: 'LIST', name: 'Lista', active: true },
    { id: 'TABLE', name: 'Tabla', active: true }
  ];

  constructor(
    private catalogConfigService: CatalogConfigService,
    public formConfig: FormRegisterConfig
  ) {}

  ngOnInit(): void {
    this.formConfig.configForm();

    this.formConfig.columns?.valueChanges.subscribe(value => {
      const columns = Number(value);

      if (!isNaN(columns) && columns >= 1 && columns <= 4) {
        this.catalogConfig.columns = columns;
      }
    });

    this.formConfig.productsPerPage?.valueChanges.subscribe(value => {
      const total = Number(value);

      if (!isNaN(total) && total >= 1) {
        this.catalogConfig.productsPerPage = total;
      }
    });
  }

  defaultConfig(): CatalogConfigRequest {
    return {
      id: -1,
      name: 'Catálogo predeterminado',

      active: true,

      // PORTADA
      showCover: true,
      coverImage: null,
      headerImage: null,

      // ENCABEZADO
      showHeader: true,

      // VISTA
      viewMode: 'GRID',
      columns: 3,

      // CONTENIDO
      showImage: true,
      showPrice: true,
      showPricePromo: true,
      showDescription: true,
      showCode: true,
      showStatus: true,
      cardBorder: false,

      // PAGINACIÓN
      productsPerPage: 12,
      showPageNumber: true,
      showFooter: true
    };
  }

  catalogConfig: any = this.defaultConfig();

  get savedConfigsWithNew() {
    return [
      {
        id: -1,
        name: 'Nueva configuración',
        active: true
      },
      ...this.configurations
    ];
  }

  mockProducts = [
    {
      code: 'P001',
      name: 'Laptop Lenovo',
      description: 'Laptop empresarial de alto rendimiento',
      price: 2500,
      promoPrice: 2300,
      status: 'DISPONIBLE',
      image: 'https://img.kwcdn.com/product/fancy/39ee6eff-88d2-4f4a-88fa-121829e1e88d.jpg'
    },
    {
      code: 'P002',
      name: 'Mouse Logitech',
      description: 'Mouse inalámbrico ergonómico',
      price: 120,
      promoPrice: 99,
      status: 'DISPONIBLE',
      image: 'https://img.kwcdn.com/product/fancy/6390fdb5-f622-437f-849d-7cc608ca2343.jpg'
    },
    {
      code: 'P003',
      name: 'Teclado Redragon',
      description: 'Teclado mecánico gamer',
      price: 180,
      promoPrice: 150,
      status: 'AGOTADO',
      image: 'https://img.kwcdn.com/product/fancy/c794cea7-a7bb-4a11-be92-e94cf5eec536.jpg'
    },
    {
      code: 'P004',
      name: 'Monitor Samsung',
      description: 'Monitor Full HD 24 pulgadas',
      price: 850,
      promoPrice: null,
      status: 'DISPONIBLE',
      image: 'https://img.kwcdn.com/product/fancy/9ea17cb9-bda4-47e4-bfbe-be8939dc9e87.jpg'
    }
  ];

  hasPromo(product: any): boolean {
    return !!product.promoPrice && product.promoPrice < product.price;
  }

  get previewProducts() {
    return this.mockProducts.slice(0, this.catalogConfig.productsPerPage);
  }

  goToCover() {
    this.currentPreviewPage = 'cover';
  }

  goToProducts() {
    this.currentPreviewPage = 'products';
  }

  openDialog() {

    this.selectedConfigId = -1;

    this.catalogConfig = this.defaultConfig();

    this.currentPreviewPage =
      this.catalogConfig.showCover ? 'cover' : 'products';

    this.formConfig.formulario.patchValue(this.catalogConfig);

    this.dialogModel.display = true;
  }

  cerrarDialog() {
    this.dialogModel.display = false;
  }

  onConfigChange(event: any) {
    this.selectedConfigId = Number(event.value);

    if (this.selectedConfigId === -1) {
      this.catalogConfig = this.defaultConfig();
    } else {

      const config = this.configurations.find(
        x => x.id === this.selectedConfigId
      );

      this.catalogConfig = config
        ? { ...config }
        : this.defaultConfig();
    }

    this.currentPreviewPage =
      this.catalogConfig.showCover ? 'cover' : 'products';

    this.formConfig.formulario.patchValue(this.catalogConfig);
  }

  onViewModeChange(event: any) {
    this.catalogConfig.viewMode = event.value;
    this.currentPreviewPage = 'products';
  }

  onColumnsChange(event: any) {
    let value = Number(event.value || 1);

    if (value < 1) value = 1;
    if (value > 4) value = 4;

    this.catalogConfig.columns = value;

    this.currentPreviewPage = 'products';

    if (this.formConfig.columns?.value !== value) {
      this.formConfig.columns?.setValue(
        value,
        { emitEvent: false }
      );
    }
  }

  guardarConfiguracion() {

    Object.assign(
      this.catalogConfig,
      this.formConfig.assignModel()
    );

    this.onSave.emit({
      id: this.selectedConfigId,
      ...this.catalogConfig,

      coverImageFile: this.coverImageFile,
      headerImageFile: this.headerImageFile,

    });
  }

  generarCatalogo() {
    Object.assign(
      this.catalogConfig,
      this.formConfig.assignModel()
    );

    this.onGenerate.emit(this.catalogConfig);
  }

  eliminarConfiguracion() {
    if (this.selectedConfigId !== -1) {

      this.onDelete.emit(this.selectedConfigId);

      this.openDialog();
    }
  }

  get gridColumns() {
    return `repeat(${this.catalogConfig.columns}, 1fr)`;
  }

  onCoverImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    this.coverImageFile = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.coverImage = reader.result as string;
      this.goToCover();
    };

    reader.readAsDataURL(file);
  }

  onHeaderImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    this.headerImageFile = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.headerImage = reader.result as string;
      this.goToProducts();
    };

    reader.readAsDataURL(file);
  }
}
