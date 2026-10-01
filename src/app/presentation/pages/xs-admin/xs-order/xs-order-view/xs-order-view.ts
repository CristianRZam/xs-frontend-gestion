import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { OrderUseCase } from '../../../../../core/application/use-cases/order.usecase';
import { ProductUseCase } from '../../../../../core/application/use-cases/product.usecase';
import { CommerceItem, OrderModel } from '../../../../../core/domain/models/commerce.model';
import { ProductModel } from '../../../../../core/domain/models/product.model';
import { XsButton } from '../../../../../shared/components/xs-button/xs-button';
import { XsCalendar } from '../../../../../shared/components/xs-calendar/xs-calendar';
import { XsDialog } from '../../../../../shared/components/xs-dialog/xs-dialog';
import { XsInputNumber } from '../../../../../shared/components/xs-input-number/xs-input-number';
import { XsInputText } from '../../../../../shared/components/xs-input-text/xs-input-text';
import { XsLoader } from '../../../../../shared/components/xs-loader/xs-loader';
import { XsSelect } from '../../../../../shared/components/xs-select/xs-select';
import { XsTextArea } from '../../../../../shared/components/xs-text-area/xs-text-area';
import { XsToast } from '../../../../../shared/components/xs-toast/xs-toast';
import { ErrorHandlerService } from '../../../../../shared/services/error-handler.service';

type OrderItemForm = FormGroup<{
  productId: FormControl<number>;
  quantity: FormControl<number>;
  unitPrice: FormControl<number>;
  notes: FormControl<string>;
}>;

@Component({
  selector: 'xs-order-view',
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe, XsButton, XsCalendar, XsDialog, XsInputNumber, XsInputText, XsLoader, XsSelect, XsTextArea, XsToast],
  templateUrl: './xs-order-view.html',
  styleUrl: './xs-order-view.scss'
})
export class XsOrderView implements AfterViewInit {
  @ViewChild('loader') private loader!: XsLoader;
  @ViewChild('toast') private toast!: XsToast;

  public readonly statusOptions = [
    { label: 'Todas', value: 'ALL', active: true },
    { label: 'Pendientes', value: 'PENDING', active: true },
    { label: 'En preparación', value: 'PREPARING', active: true },
    { label: 'Listas', value: 'READY', active: true },
    { label: 'Completadas', value: 'COMPLETED', active: true },
    { label: 'Canceladas', value: 'CANCELLED', active: true }
  ];
  public readonly typeOptions = [
    { label: 'En local', value: 'DINE_IN', active: true  }, { label: 'Para llevar', value: 'TAKEAWAY', active: true  }, { label: 'Delivery', value: 'DELIVERY', active: true  }
  ];
  public orders: OrderModel[] = [];
  public products: ProductModel[] = [];
  public readonly productSearch = new FormControl('', { nonNullable: true, validators: [Validators.maxLength(100)] });
  public productPage = 0;
  public productHasMore = false;
  public loadingProducts = false;
  public page = 0;
  public hasMore = false;
  public detail?: OrderModel;
  public detailVisible = false;
  public formVisible = false;
  public deleteVisible = false;
  public editing?: OrderModel;
  public readonly filters = new FormGroup({
    search: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(100)] }),
    status: new FormControl('ALL', { nonNullable: true }),
    fromDate: new FormControl<Date | null>(null),
    toDate: new FormControl<Date | null>(null)
  });
  public readonly orderForm = new FormGroup({
    orderType: new FormControl('DINE_IN', { nonNullable: true, validators: [Validators.required] }),
    tableNumber: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(50)] }),
    notes: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(255)] }),
    items: new FormArray<OrderItemForm>([])
  });
  private originalReserved = new Map<number, number>();
  private readonly selectedProducts = new Map<number, ProductModel>();
  private productRequestVersion = 0;

  constructor(
    private readonly orderUseCase: OrderUseCase,
    private readonly productUseCase: ProductUseCase,
    private readonly errorHandler: ErrorHandlerService,
    private readonly router: Router
  ) {}

  get items(): FormArray<OrderItemForm> { return this.orderForm.controls.items; }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.refresh();
      this.resetProducts();
    });
  }

  refresh(): void {
    this.filters.markAllAsTouched();
    if (this.filters.invalid || this.invalidDateRange()) {
      this.toast.show('Revisa los filtros de búsqueda y el rango de fechas.', 'error');
      return;
    }
    this.orders = [];
    this.page = 0;
    this.hasMore = false;
    this.loadMore();
  }

  resetFilters(): void {
    this.filters.reset({ search: '', status: 'ALL', fromDate: null, toDate: null });
    this.refresh();
  }

  loadMore(): void {
    const filter = this.filters.getRawValue();
    this.loader.show('Cargando órdenes...');
    this.orderUseCase.getPage(this.page, environment.SALES_ORDERS_PAGE_SIZE, this.toIsoDate(filter.fromDate), this.toIsoDate(filter.toDate), filter.status, filter.search.trim() || undefined).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (response.success && response.data) {
          this.orders.push(...response.data.items);
          this.hasMore = response.data.hasMore;
          this.page++;
          return;
        }
        this.toast.show(response.message || 'No se pudieron cargar las órdenes.', 'error');
      },
      error: error => this.handleError(error, 'cargar', 'órdenes')
    });
  }

  showDetail(id: number): void {
    this.loader.show('Cargando orden...');
    this.orderUseCase.getById(id).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => { if (response.success && response.data) { this.detail = response.data; this.detailVisible = true; } },
      error: error => this.handleError(error, 'cargar', 'detalle de orden')
    });
  }

  openCreate(): void {
    this.editing = undefined;
    this.originalReserved.clear();
    this.orderForm.reset({ orderType: 'DINE_IN', tableNumber: '', notes: '' });
    this.items.clear();
    this.resetProducts();
    this.formVisible = true;
  }

  openEdit(): void {
    if (!this.detail || this.detail.status !== 'PENDING') return;
    this.editing = this.detail;
    this.originalReserved.clear();
    this.orderForm.reset({ orderType: this.detail.orderType || 'DINE_IN', tableNumber: this.detail.tableNumber || '', notes: this.detail.notes || '' });
    this.items.clear();
    this.detail.items.forEach(item => {
      this.originalReserved.set(item.productId, (this.originalReserved.get(item.productId) || 0) + item.quantity);
      this.items.push(this.createItem(item.productId, item.quantity, item.unitPrice, item.notes || ''));
    });
    this.detailVisible = false;
    this.resetProducts();
    this.formVisible = true;
  }

  addProduct(product: ProductModel): void {
    if (!product.id) return;
    this.selectedProducts.set(product.id, product);
    const index = this.items.controls.findIndex(item => item.controls.productId.value === product.id);
    const max = this.itemMaxByProduct(product.id);
    if (max <= 0) return this.toast.show(`${product.name || 'Este producto'} no tiene stock disponible.`, 'error');
    if (index >= 0) {
      const quantity = this.items.at(index).controls.quantity;
      if (quantity.value + 1 > max) return this.toast.show(`Solo hay ${max} unidad(es) disponible(s) de ${product.name}.`, 'error');
      quantity.setValue(quantity.value + 1);
      return;
    }
    this.items.push(this.createItem(product.id, 1, product.promoPrice ?? product.basePrice ?? 0, ''));
  }

  removeItem(index: number): void { this.items.removeAt(index); }

  searchProducts(): void {
    if (this.productSearch.invalid) return;
    this.resetProducts();
  }

  loadMoreProducts(): void {
    if (this.loadingProducts || !this.productHasMore) return;
    this.loadProducts();
  }

  itemName(index: number): string {
    const productId = this.items.at(index).controls.productId.value;
    return this.selectedProducts.get(productId)?.name || this.products.find(product => product.id === productId)?.name || `Producto #${productId}`;
  }

  itemMax(index: number): number { return this.itemMaxByProduct(this.items.at(index).controls.productId.value); }

  itemSubtotal(index: number): number {
    const value = this.items.at(index).getRawValue();
    return value.quantity * value.unitPrice;
  }

  total(order?: OrderModel): number {
    if (order) return order.items.reduce((sum, item) => sum + (item.subtotal ?? item.quantity * item.unitPrice) - (item.discount ?? 0), 0);
    return this.items.controls.reduce((sum, _, index) => sum + this.itemSubtotal(index), 0);
  }

  save(): void {
    this.orderForm.markAllAsTouched();
    const invalidStock = this.items.controls.some((_, index) => this.items.at(index).controls.quantity.value > this.itemMax(index));
    if (!this.items.length) return this.toast.show('La orden debe incluir al menos un producto.', 'error');
    if (this.orderForm.invalid) return this.toast.show('Revisa los campos marcados antes de guardar la orden.', 'error');
    if (invalidStock) return this.toast.show('La cantidad solicitada supera el stock disponible.', 'error');
    const value = this.orderForm.getRawValue();
    const items: CommerceItem[] = this.items.controls.map(item => {
      const row = item.getRawValue();
      return { productId: row.productId, quantity: row.quantity, unitPrice: row.unitPrice, notes: row.notes.trim() || undefined };
    });
    const request = { orderNumber: this.editing?.orderNumber || 'WEB-' + Date.now(), orderType: value.orderType, tableNumber: value.tableNumber.trim() || undefined, status: this.editing?.status || 'PENDING', notes: value.notes.trim() || undefined, items };
    this.loader.show(this.editing ? 'Actualizando orden...' : 'Creando orden...');
    const operation = this.editing ? this.orderUseCase.update(this.editing.id, { ...request, id: this.editing.id }) : this.orderUseCase.create(request);
    operation.pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (response.success) { this.formVisible = false; this.refresh(); this.toast.show(this.editing ? 'Orden actualizada correctamente.' : 'Orden creada correctamente.'); return; }
        this.toast.show(response.message, 'error');
      },
      error: error => this.handleError(error, this.editing ? 'actualizar' : 'crear', 'orden')
    });
  }

  nextStatus(): void {
    if (!this.detail) return;
    const next = ({ PENDING: 'PREPARING', PREPARING: 'READY' } as Record<string, string>)[this.detail.status || ''];
    if (next) this.changeStatus(next);
  }

  cancelOrder(): void { this.changeStatus('CANCELLED'); }

  chargeOrder(): void {
    if (!this.detail) return;
    this.router.navigate(['/admin/sales'], { queryParams: { orderId: this.detail.id } });
  }

  changeStatus(status: string): void {
    if (!this.detail) return;
    this.loader.show('Actualizando estado...');
    this.orderUseCase.updateStatus(this.detail.id, { status }).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (response.success && response.data) { this.detail = response.data; this.refresh(); this.toast.show('Estado de la orden actualizado.'); return; }
        this.toast.show(response.message, 'error');
      },
      error: error => this.handleError(error, 'actualizar', 'estado de la orden')
    });
  }

  deleteOrder(): void {
    if (!this.detail) return;
    this.loader.show('Eliminando orden...');
    this.orderUseCase.delete(this.detail.id).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (response.success) { this.deleteVisible = false; this.detailVisible = false; this.detail = undefined; this.refresh(); this.toast.show('Orden eliminada correctamente.'); return; }
        this.toast.show(response.message, 'error');
      },
      error: error => this.handleError(error, 'eliminar', 'orden')
    });
  }

  statusLabel(status?: string): string {
    return ({ PENDING: 'Pendiente', PREPARING: 'En preparación', READY: 'Lista', COMPLETED: 'Completada', CANCELLED: 'Cancelada' } as Record<string, string>)[status ?? ''] ?? status ?? 'Pendiente';
  }

  private createItem(productId: number, quantity: number, unitPrice: number, notes: string): OrderItemForm {
    return new FormGroup({
      productId: new FormControl(productId, { nonNullable: true }),
      quantity: new FormControl(quantity, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)] }),
      unitPrice: new FormControl(unitPrice, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
      notes: new FormControl(notes, { nonNullable: true, validators: [Validators.maxLength(255)] })
    });
  }

  private itemMaxByProduct(productId: number): number {
    const product = this.selectedProducts.get(productId) ?? this.products.find(item => item.id === productId);
    if (!product || product.totalStock === undefined) return 999999;
    const available = Math.max(0, product.totalStock - (product.reservedStock ?? 0));
    return available + (this.originalReserved.get(productId) || 0);
  }

  private invalidDateRange(): boolean {
    const value = this.filters.getRawValue();
    return !!value.fromDate && !!value.toDate && value.fromDate > value.toDate;
  }

  private toIsoDate(value: Date | null): string | undefined {
    if (!value) return undefined;
    const offsetDate = new Date(value.getTime() - value.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 10);
  }

  private resetProducts(): void {
    this.productRequestVersion++;
    this.products = [];
    this.productPage = 0;
    this.productHasMore = true;
    this.loadProducts();
  }

  private loadProducts(): void {
    const requestVersion = this.productRequestVersion;
    const page = this.productPage;
    const query = this.productSearch.value.trim() || undefined;
    this.loadingProducts = true;
    this.productUseCase.init({ page, size: environment.PRODUCT_PAGE_SIZE, status: true, name: query }).subscribe({
      next: response => {
        if (requestVersion !== this.productRequestVersion) return;
        if (response.success && response.data) {
          const currentIds = new Set(this.products.map(product => product.id));
          const newProducts = response.data.products.filter(product => !currentIds.has(product.id));
          this.products.push(...newProducts);
          this.productPage = page + 1;
          this.productHasMore = this.products.length < response.data.totalProducts;
          return;
        }
        this.toast.show(response.message || 'No se pudieron cargar los productos.', 'error');
      },
      error: error => {
        if (requestVersion === this.productRequestVersion) this.handleError(error, 'cargar', 'productos');
      },
      complete: () => {
        if (requestVersion === this.productRequestVersion) this.loadingProducts = false;
      }
    });
  }

  private handleError(error: Parameters<ErrorHandlerService['getErrorMessage']>[0], action: string, noun: string): void {
    this.toast.show(this.errorHandler.getErrorMessage(error, action, noun), 'error');
  }
}
