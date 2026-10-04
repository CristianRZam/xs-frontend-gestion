import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ProductUseCase } from '../../../../../core/application/use-cases/product.usecase';
import { OrderUseCase } from '../../../../../core/application/use-cases/order.usecase';
import { SaleUseCase } from '../../../../../core/application/use-cases/sale.usecase';
import { CommerceItem, OrderModel, SaleModel, SalePayment } from '../../../../../core/domain/models/commerce.model';
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
import { AuthService } from '../../../../../infraestructure/persistence/auth.service';

type SaleItemForm = FormGroup<{
  productId: FormControl<number>;
  quantity: FormControl<number>;
  unitPrice: FormControl<number>;
  discount: FormControl<number>;
}>;

type PaymentForm = FormGroup<{
  paymentMethod: FormControl<string>;
  amount: FormControl<number>;
  receivedAmount: FormControl<number | null>;
  reference: FormControl<string>;
}>;

@Component({
  selector: 'xs-sale-view',
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe, XsButton, XsCalendar, XsDialog, XsInputNumber, XsInputText, XsLoader, XsSelect, XsTextArea, XsToast],
  templateUrl: './xs-sale-view.html',
  styleUrl: './xs-sale-view.scss'
})
export class XsSaleView implements AfterViewInit {
  @ViewChild('loader') private loader!: XsLoader;
  @ViewChild('toast') private toast!: XsToast;

  public readonly paymentMethods = [
    { label: 'Efectivo', value: 'CASH' },
    { label: 'Yape', value: 'YAPE' },
    { label: 'Tarjeta', value: 'CARD' },
    { label: 'Transferencia', value: 'TRANSFER' }
  ];
  public sales: SaleModel[] = [];
  public products: ProductModel[] = [];
  public readonly productSearch = new FormControl('', { nonNullable: true, validators: [Validators.maxLength(100)] });
  public productPage = 0;
  public productHasMore = false;
  public loadingProducts = false;
  public page = 0;
  public hasMore = false;
  public detail?: SaleModel;
  public detailVisible = false;
  public formVisible = false;
  public sourceOrder?: OrderModel;
  public cancelVisible = false;
  public canCreateSale = false;
  public canCancelSale = false;
  public readonly cancellationReason = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(255)] });
  public readonly filters = new FormGroup({
    fromDate: new FormControl<Date | null>(null),
    toDate: new FormControl<Date | null>(null)
  });
  public readonly saleForm = new FormGroup({
    discount: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    items: new FormArray<SaleItemForm>([]),
    payments: new FormArray<PaymentForm>([])
  });
  private productRequestVersion = 0;
  private readonly selectedProducts = new Map<number, ProductModel>();

  constructor(
    private readonly salesApi: SaleUseCase,
    private readonly productsApi: ProductUseCase,
    private readonly errors: ErrorHandlerService,
    private readonly orderApi: OrderUseCase,
    private readonly route: ActivatedRoute,
    authService: AuthService
  ) {
    const permissions = authService.getPermissions();
    this.canCreateSale = permissions.includes('CREATE_SALE');
    this.canCancelSale = permissions.includes('CANCEL_SALE');
  }

  get items(): FormArray<SaleItemForm> { return this.saleForm.controls.items; }
  get payments(): FormArray<PaymentForm> { return this.saleForm.controls.payments; }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.refresh();
      if (this.canCreateSale) {
        this.resetProducts();
        this.route.queryParamMap.subscribe(params => {
          const orderId = Number(params.get('orderId'));
          if (Number.isInteger(orderId) && orderId > 0) this.openOrderSale(orderId);
        });
      }
    });
  }

  refresh(): void {
    if (this.invalidDateRange()) return this.toast.show('La fecha desde no puede ser posterior a la fecha hasta.', 'error');
    this.sales = [];
    this.page = 0;
    this.hasMore = false;
    this.loadMore();
  }

  loadMore(): void {
    this.loader.show('Cargando ventas...');
    const filter = this.filters.getRawValue();
    this.salesApi.getPage(this.page, environment.SALES_ORDERS_PAGE_SIZE, this.toIsoDate(filter.fromDate), this.toIsoDate(filter.toDate)).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (response.success && response.data) {
          this.sales.push(...response.data.items);
          this.hasMore = response.data.hasMore;
          this.page++;
          return;
        }
        this.toast.show(response.message || 'No se pudieron cargar las ventas.', 'error');
      },
      error: error => this.fail(error)
    });
  }

  openForm(): void {
    if (!this.canCreateSale) return;
    this.sourceOrder = undefined;
    this.saleForm.reset({ discount: 0 });
    this.items.clear();
    this.payments.clear();
    this.addPayment('CASH');
    this.resetProducts();
    this.formVisible = true;
  }

  openOrderSale(orderId: number): void {
    if (!this.canCreateSale) return;
    this.loader.show('Cargando orden para cobro...');
    this.orderApi.getById(orderId).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (!response.success || !response.data) return this.toast.show(response.message || 'No se pudo cargar la orden.', 'error');
        const order = response.data;
        if (order.status === 'COMPLETED' || order.status === 'CANCELLED') return this.toast.show('Esta orden no puede cobrarse.', 'error');
        this.sourceOrder = order;
        this.saleForm.reset({ discount: 0 });
        this.items.clear();
        order.items.forEach(item => {
          const control = this.createItemFromOrder(item);
          control.controls.quantity.disable();
          control.controls.unitPrice.disable();
          this.items.push(control);
        });
        this.payments.clear();
        this.addPayment('CASH');
        this.syncSinglePayment();
        this.formVisible = true;
      },
      error: error => this.fail(error)
    });
  }

  addProduct(product: ProductModel): void {
    if (this.sourceOrder) {
      this.toast.show('Los productos de una orden en cobro no se pueden modificar.', 'error');
      return;
    }
    if (!product.id) return;
    const itemIndex = this.items.controls.findIndex(item => item.controls.productId.value === product.id);
    const available = this.availableStock(product);
    if (available !== undefined && available <= 0) {
      this.toast.show(`${product.name || 'Este producto'} no tiene stock disponible.`, 'error');
      return;
    }
    if (itemIndex >= 0) {
      const item = this.items.at(itemIndex);
      const nextQuantity = item.controls.quantity.value + 1;
      if (available !== undefined && nextQuantity > available) {
        this.toast.show(`Solo hay ${available} unidad(es) disponible(s) de ${product.name}.`, 'error');
        return;
      }
      item.controls.quantity.setValue(nextQuantity);
    } else {
      this.selectedProducts.set(product.id, product);
      this.items.push(this.createItem(product));
    }
    this.syncSinglePayment();
  }

  removeItem(index: number): void {
    if (this.sourceOrder) {
      this.toast.show('Los productos de una orden en cobro no se pueden modificar.', 'error');
      return;
    }
    this.items.removeAt(index);
    this.syncSinglePayment();
  }

  searchProducts(): void {
    if (this.productSearch.valid) this.resetProducts();
  }

  loadMoreProducts(): void {
    if (!this.loadingProducts && this.productHasMore) this.loadProducts();
  }

  addPayment(method = 'YAPE'): void {
    this.payments.push(this.createPayment(method));
  }

  removePayment(index: number): void {
    if (this.payments.length > 1) this.payments.removeAt(index);
  }

  onPaymentMethodChange(index: number, method: string): void {
    const payment = this.payments.at(index);
    payment.controls.paymentMethod.setValue(method);
    const received = payment.controls.receivedAmount;
    received.clearValidators();
    if (method === 'CASH') received.setValidators([Validators.required, Validators.min(0)]);
    else received.setValue(null);
    received.updateValueAndValidity();
  }

  itemName(index: number): string {
    const productId = this.items.at(index).controls.productId.value;
    return this.sourceOrder?.items.find(item => item.productId === productId)?.productName || this.selectedProducts.get(productId)?.name || this.products.find(product => product.id === productId)?.name || `Producto #${productId}`;
  }

  itemMax(index: number): number {
    const productId = this.items.at(index).controls.productId.value;
    const product = this.selectedProducts.get(productId) ?? this.products.find(item => item.id === productId);
    return product ? this.availableStock(product) : 999999;
  }

  itemSubtotal(index: number): number {
    const item = this.items.at(index).getRawValue();
    return Math.max(0, item.quantity * item.unitPrice - item.discount);
  }

  subtotal(): number {
    return this.items.controls.reduce((total, _, index) => total + this.itemSubtotal(index), 0);
  }

  discountAmount(): number { return this.saleForm.controls.discount.value || 0; }
  total(): number { return Math.max(0, this.subtotal() - this.discountAmount()); }
  paid(): number { return this.payments.controls.reduce((total, payment) => total + Number(payment.controls.amount.value || 0), 0); }
  pending(): number { return this.total() - this.paid(); }
  change(index: number): number { const payment = this.payments.at(index).getRawValue(); return payment.paymentMethod === 'CASH' ? Math.max(0, Number(payment.receivedAmount || 0) - payment.amount) : 0; }

  syncSinglePayment(): void {
    if (this.payments.length === 1) this.payments.at(0).controls.amount.setValue(this.total());
  }

  save(): void {
    if (!this.canCreateSale) return;
    this.saleForm.markAllAsTouched();
    const discount = this.discountAmount();
    const invalidStock = !this.sourceOrder && this.items.controls.some((item, index) => item.controls.quantity.value > this.itemMax(index));
    const invalidCash = this.payments.controls.some(payment => {
      const value = payment.getRawValue();
      return value.paymentMethod === 'CASH' && Number(value.receivedAmount || 0) < value.amount;
    });
    if (!this.items.length) return this.toast.show('Agrega al menos un producto a la venta.', 'error');
    if (this.saleForm.invalid) return this.toast.show('Revisa los campos marcados antes de confirmar el cobro.', 'error');
    if (this.sourceOrder && !this.matchesSourceOrder()) {
      return this.toast.show('Los productos y cantidades deben coincidir con la orden que se está cobrando.', 'error');
    }
    if (discount > this.subtotal()) return this.toast.show('El descuento no puede superar el subtotal.', 'error');
    if (invalidStock) return this.toast.show('La cantidad solicitada supera el stock disponible.', 'error');
    if (invalidCash) return this.toast.show('El efectivo recibido debe cubrir el monto aplicado.', 'error');
    if (Math.abs(this.paid() - this.total()) >= 0.01) return this.toast.show('La suma de los pagos debe coincidir con el total.', 'error');

    const items: CommerceItem[] = this.items.controls.map(item => {
      const value = item.getRawValue();
      return { productId: value.productId, quantity: value.quantity, unitPrice: value.unitPrice, discount: value.discount || undefined };
    });
    const payments: SalePayment[] = this.payments.controls.map(payment => {
      const value = payment.getRawValue();
      return { paymentMethod: value.paymentMethod, amount: value.amount, receivedAmount: value.paymentMethod === 'CASH' ? Number(value.receivedAmount) : undefined, reference: value.reference.trim() || undefined };
    });
    this.loader.show('Registrando venta...');
    this.salesApi.create({ orderId: this.sourceOrder?.id, discount, items, payments }).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (response.success) {
          this.formVisible = false;
          this.refresh();
          this.toast.show('Venta registrada correctamente.');
          return;
        }
        this.toast.show(response.message, 'error');
      },
      error: error => this.fail(error)
    });
  }

  showDetail(id: number): void {
    this.loader.show('Cargando venta...');
    this.salesApi.getById(id).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => { if (response.success && response.data) { this.detail = response.data; this.detailVisible = true; } },
      error: error => this.fail(error)
    });
  }

  openCancellation(): void {
    if (!this.canCancelSale) return;
    this.cancellationReason.reset('');
    this.cancelVisible = true;
  }

  cancelSale(): void {
    if (!this.canCancelSale) return;
    this.cancellationReason.markAsTouched();
    if (!this.detail || this.cancellationReason.invalid) return this.toast.show('Indica el motivo de la anulación.', 'error');
    this.loader.show('Anulando venta...');
    this.salesApi.cancel(this.detail.id, { reason: this.cancellationReason.value.trim() }).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (response.success) { this.detail = response.data ?? this.detail; this.cancelVisible = false; this.refresh(); this.toast.show('Venta anulada correctamente.'); return; }
        this.toast.show(response.message, 'error');
      },
      error: error => this.fail(error)
    });
  }

  paymentLabel(method: string): string {
    return ({ CASH: 'Efectivo', YAPE: 'Yape', CARD: 'Tarjeta', TRANSFER: 'Transferencia' } as Record<string, string>)[method] ?? method;
  }

  private createItem(product: ProductModel): SaleItemForm {
    return new FormGroup({
      productId: new FormControl(product.id!, { nonNullable: true }),
      quantity: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)] }),
      unitPrice: new FormControl(product.promoPrice ?? product.basePrice ?? 0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
      discount: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] })
    });
  }

  private createItemFromOrder(item: CommerceItem): SaleItemForm {
    return new FormGroup({
      productId: new FormControl(item.productId, { nonNullable: true }),
      quantity: new FormControl(item.quantity, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)] }),
      unitPrice: new FormControl(item.unitPrice, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
      discount: new FormControl(item.discount ?? 0, { nonNullable: true, validators: [Validators.min(0)] })
    });
  }

  private availableStock(product: ProductModel): number {
    return Math.max(0, (product.totalStock ?? 0) - (product.reservedStock ?? 0));
  }

  private matchesSourceOrder(): boolean {
    if (!this.sourceOrder) return true;
    const ordered = new Map<number, number>();
    this.sourceOrder.items.forEach(item => ordered.set(item.productId, (ordered.get(item.productId) || 0) + item.quantity));
    const saleItems = new Map<number, number>();
    this.items.controls.forEach(item => {
      const value = item.getRawValue();
      saleItems.set(value.productId, (saleItems.get(value.productId) || 0) + value.quantity);
    });
    return ordered.size === saleItems.size && [...ordered].every(([productId, quantity]) => saleItems.get(productId) === quantity);
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
    const name = this.productSearch.value.trim() || undefined;
    this.loadingProducts = true;
    this.productsApi.init({ page, size: environment.PRODUCT_PAGE_SIZE, status: true, name }).subscribe({
      next: response => {
        if (requestVersion !== this.productRequestVersion) return;
        if (response.success && response.data) {
          const ids = new Set(this.products.map(product => product.id));
          this.products.push(...response.data.products.filter(product => !ids.has(product.id)));
          this.productPage = page + 1;
          this.productHasMore = this.products.length < response.data.totalProducts;
          return;
        }
        this.toast.show(response.message || 'No se pudieron cargar los productos.', 'error');
      },
      error: error => { if (requestVersion === this.productRequestVersion) this.fail(error); },
      complete: () => { if (requestVersion === this.productRequestVersion) this.loadingProducts = false; }
    });
  }

  private invalidDateRange(): boolean {
    const value = this.filters.getRawValue();
    return !!value.fromDate && !!value.toDate && value.fromDate > value.toDate;
  }

  private toIsoDate(value: Date | null): string | undefined {
    if (!value) return undefined;
    const date = new Date(value.getTime() - value.getTimezoneOffset() * 60000);
    return date.toISOString().slice(0, 10);
  }

  private createPayment(method: string): PaymentForm {
    const received = new FormControl<number | null>(method === 'CASH' ? 0 : null);
    if (method === 'CASH') received.setValidators([Validators.required, Validators.min(0)]);
    return new FormGroup({
      paymentMethod: new FormControl(method, { nonNullable: true, validators: [Validators.required] }),
      amount: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0.01)] }),
      receivedAmount: received,
      reference: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(100)] })
    });
  }

  private fail(error: Parameters<ErrorHandlerService['getErrorMessage']>[0]): void {
    this.toast.show(this.errors.getErrorMessage(error, 'procesar', 'venta'), 'error');
  }
}
