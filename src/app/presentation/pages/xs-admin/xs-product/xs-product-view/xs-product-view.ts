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
  ],
  templateUrl: './xs-product-view.html',
  styleUrl: './xs-product-view.scss'
})
export class XsProductView implements OnInit, AfterViewInit{
  @ViewChild('xsLoader') loader!: XsLoader;
  @ViewChild('xsToastProductView') private toast!: XsToast;
  @ViewChild(XsProductRegister) productRegister!: XsProductRegister;

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
    size: 5
  };
  productFormResponse: ProductFormResponse = {};

  constructor(
    private productUsecase: ProductUseCase,
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

  create(item: ProductRequest) {
    this.loader.show('Guardando producto...');
    this.productUsecase.create(item).subscribe({
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

  update(item: ProductRequest) {
    this.loader.show('Actualizado producto...');
    this.productUsecase.update(item).subscribe({
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
}
