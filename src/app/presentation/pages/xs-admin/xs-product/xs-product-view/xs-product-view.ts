import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {XsLoader} from "../../../../../shared/components/xs-loader/xs-loader";
import {XsPageHeader} from "../../../../../shared/components/xs-page-header/xs-page-header";
import {XsToast} from "../../../../../shared/components/xs-toast/xs-toast";
import {XsProductCardDetail} from '../xs-product-card-detail/xs-product-card-detail';
import {XsProductFilter} from '../xs-product-filter/xs-product-filter';
import {XsProductRegister} from '../xs-product-register/xs-product-register';
import {XsProductTable} from '../xs-product-table/xs-product-table';
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';
import {ProductViewRequest} from '../../../../../core/domain/dtos/resquests/product-view.request';
import {ProductModel} from '../../../../../core/domain/models/product.model';
import {ProductRequest} from '../../../../../core/domain/dtos/resquests/product.request';
import {ErrorHandlerService} from '../../../../../shared/services/error-handler.service';
import {Formvalidators} from '../../../../../shared/validators/form-validators';
import {ProductUseCase} from '../../../../../core/application/use-cases/product.usecase';
import {ProductFormResponse} from '../../../../../core/domain/dtos/responses/product-form.response';
import {ProductPayloadRequest} from '../../../../../core/domain/dtos/resquests/product-payload.request';
import {XsProductCatalogDialog} from '../../xs-product-catalog/xs-product-catalog-dialog/xs-product-catalog-dialog';
import {CatalogConfigUseCase} from '../../../../../core/application/use-cases/catalog-config.usecase';
import {CatalogConfigDTO} from '../../../../../core/domain/dtos/responses/catalog-config-dto';
import { environment } from '../../../../../../environments/environment';
import { XsInventoryMovementHistory } from '../../../../../shared/components/xs-inventory-movement-history/xs-inventory-movement-history';
import { InventoryMovementCreateRequest } from '../../../../../core/domain/models/inventory-movement.model';
import { InventoryMovementUseCase } from '../../../../../core/application/use-cases/inventory-movement.usecase';
import { InventoryRegisterType, XsInventoryMovementRegister } from '../../../../../shared/components/xs-inventory-movement-register/xs-inventory-movement-register';
import { finalize } from 'rxjs';


@Component({
  selector: 'xs-product-view',
  imports: [
    XsLoader,
    XsPageHeader,
    XsToast,
    XsProductCardDetail,
    XsProductFilter,
    XsProductRegister,
    XsProductTable,
    XsProductCatalogDialog,
    XsInventoryMovementHistory,
    XsInventoryMovementRegister,
  ],
  templateUrl: './xs-product-view.html',
  styleUrl: './xs-product-view.scss'
})
export class XsProductView implements OnInit, AfterViewInit{
  @ViewChild('xsLoader') loader!: XsLoader;
  @ViewChild('xsToastProductView') private toast!: XsToast;
  @ViewChild(XsProductRegister) productRegister!: XsProductRegister;
  @ViewChild(XsProductCatalogDialog) productCatalogDialog!: XsProductCatalogDialog;

  public totalProducts = 0;
  public activeProducts = 0;
  public inactiveProducts = 0;
  public totalStock = 0;
  public categories: ParameterModel[] = [];
  public unitMeasures: ParameterModel[] = [];
  public valuationMethods: ParameterModel[] = [];
  public products: ProductModel[] = [];
  filter: ProductViewRequest = {
    page: 0,
    size: environment.PRODUCT_PAGE_SIZE
  };
  productFormResponse: ProductFormResponse = {};
  public catalogConfigurations: CatalogConfigDTO[] = [];
  public movementProduct?: ProductModel;
  public movementHistoryVisible = false;
  public movementRegisterProduct?: ProductModel;
  public movementRegisterType: InventoryRegisterType = 'ENTRY';
  public movementRegisterVisible = false;

  constructor(
    private catalogConfigUseCase: CatalogConfigUseCase,
    private productUsecase: ProductUseCase,
    private inventoryMovementUseCase: InventoryMovementUseCase,
    private errorHandler: ErrorHandlerService,
    private util: Formvalidators
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.load();
    });
  }

  load() {
    this.loader.show('Cargando...');

    this.productUsecase.init(this.filter).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const data = response.data;
          this.products = data.products;
          this.totalProducts = data.totalProducts;
          this.activeProducts = data.activeProducts;
          this.inactiveProducts = data.inactiveProducts;
          this.totalStock = data.totalStock;
          this.categories = data.categories;
          this.valuationMethods = data.valuationMethods;
          this.unitMeasures = data.unitMeasures;
        } else {
          console.warn('No se recibieron datos válidos', response);
        }
        this.loader.hide();
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
        this.loader.hide();
      }
    });
  }

  loadById(id?: number) {
    this.loader.show('Cargando...');
    this.productUsecase.initForm(id).subscribe({
      next: (res) => {
        this.loader.hide();
        if (res.success && res.data) {
          this.productFormResponse = res.data;
          if(id){
            this.productRegister.openDialog('MODIFICAR', 'Editar producto', this.productFormResponse);
          }else{
            this.productRegister.openDialog('AGREGAR', 'Registrar nuevo producto', this.productFormResponse);
          }
        } else {
          this.toast.show("No se pudo cargar el producto", 'error');
        }
      },
      error: (e) => {
        this.loader.hide();
        console.error('Error al cargar producto', e);
        this.toast.show("Error al cargar el producto", 'error');
      }
    });
  }

  updateFilter(event: ProductViewRequest) {
    this.filter= event;
    this.load();
  }

  onProductPageChange(event: { page: number; size: number }): void {
    if (event.page === this.filter.page && event.size === this.filter.size) return;
    this.filter = { ...this.filter, page: event.page, size: event.size };
    this.load();
  }


  onAddItem() {
    this.loadById();
  }

  onUpdateItem(item: ProductModel) {
    this.loadById(item.id!);
  }

  onDeleteItem(item: ProductModel) {
    this.loader.show('Eliminando producto...');
    this.productUsecase.delete(item.id!).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Producto eliminado correctamente.");
          this.load();
        } else {
          this.toast.show(res.message || "No se pudo eliminar el producto.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "eliminar", "producto");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  onUpdateActiveItem(item: ProductModel) {
    this.loader.show('Actualizando...');
    this.productUsecase.updateStatus(item.id!).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Producto actualizado correctamente.");
          this.load();
          this.productRegister.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo actualizar el producto.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "actualizar estado", "producto");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  exportPdf($event: any) {
    this.loader.show('Generando PDF...');
    this.productUsecase.exportPdf(this.filter).subscribe({
      next: (blob) => {
        this.util.downloadFile(blob, 'products_report.pdf');
        this.toast.show("Reporte PDF generado con éxito.");
      },
      error: (e) => {
        console.error('Error al generar PDF', e);
        this.toast.show("Error al generar PDF", 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  exportExcel($event: any) {
    this.loader.show('Generando Excel...');
    this.productUsecase.exportExcel(this.filter).subscribe({
      next: (blob) => {
        this.util.downloadFile(blob, 'products_report.xlsx');
        this.toast.show("Reporte Excel generado con éxito.");
      },
      error: (e) => {
        console.error('Error al generar Excel', e);
        this.toast.show("Error al generar Excel", 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  create(payload: ProductPayloadRequest) {
    this.loader.show('Guardando producto...');
    this.productUsecase.create(payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Producto registrado con éxito.");
          this.load();
          this.productRegister.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo registrar el producto.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "registrar", "producto");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  update(payload: ProductPayloadRequest) {
    this.loader.show('Actualizando producto...');
    this.productUsecase.update(payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Producto actualizado con éxito.");
          this.load();
          this.productRegister.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo actualizar el producto.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "actualizar", "producto");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  onCatalog(){
    this.loader.show('Cargando...');
    this.catalogConfigUseCase.findAll().subscribe({
      next: response => {
        this.catalogConfigurations = response.data ?? [];
        this.productCatalogDialog.openDialog();
        this.loader.hide();
      },
      error: error => {
        console.error('Error cargando configuraciones de catalogo', error);
        this.loader.hide();
      }
    });
  }

  onMovements(product: ProductModel): void {
    this.movementProduct = product;
    this.movementHistoryVisible = true;
  }

  onMovementHistoryClose(): void {
    this.movementHistoryVisible = false;
  }

  openInventoryMovement(product: ProductModel, type: InventoryRegisterType): void {
    this.movementRegisterProduct = product;
    this.movementRegisterType = type;
    this.movementRegisterVisible = true;
  }

  closeInventoryMovement(): void { this.movementRegisterVisible = false; }

  createInventoryMovement(request: InventoryMovementCreateRequest): void {
    this.loader.show('Registrando movimiento de inventario...');
    this.inventoryMovementUseCase.create(request).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (!response.success) return this.toast.show(response.message || 'No se pudo registrar el movimiento.', 'error');
        this.closeInventoryMovement();
        this.toast.show('Movimiento de inventario registrado correctamente.');
        this.load();
      },
      error: error => this.toast.show(this.errorHandler.getErrorMessage(error, 'registrar', 'movimiento de inventario'), 'error')
    });
  }


  saveCatalogConfiguration(payload: any): void {
    if (payload.id != null && payload.id !== -1) {
      this.updateCatalogConfiguration(payload);
    } else {
      this.createCatalogConfiguration(payload);
    }
  }

  private createCatalogConfiguration(payload: any): void {
    this.loader.show('Guardando configuración...');

    this.catalogConfigUseCase.create(payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show('Configuración registrada con éxito.');
        } else {
          this.toast.show(
            res.message || 'No se pudo registrar la configuración.',
            'error'
          );
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(
          e,
          'registrar',
          'configuración'
        );
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  private updateCatalogConfiguration(payload: any): void {
    this.loader.show('Actualizando configuración...');

    this.catalogConfigUseCase.update(payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show('Configuración actualizada con éxito.');
        } else {
          this.toast.show(
            res.message || 'No se pudo actualizar la configuración.',
            'error'
          );
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(
          e,
          'actualizar',
          'configuración'
        );
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }
}
