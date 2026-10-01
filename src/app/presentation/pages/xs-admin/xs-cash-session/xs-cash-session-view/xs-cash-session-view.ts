import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CashSessionUseCase } from '../../../../../core/application/use-cases/cash-session.usecase';
import { SaleUseCase } from '../../../../../core/application/use-cases/sale.usecase';
import { CashSessionSale, CashSessionSalesSummary } from '../../../../../core/domain/dtos/responses/cash-session-sales-summary.response';
import { CashSessionModel } from '../../../../../core/domain/models/cash-session.model';
import { ErrorHandlerService } from '../../../../../shared/services/error-handler.service';
import { XsButton } from '../../../../../shared/components/xs-button/xs-button';
import { XsDialog } from '../../../../../shared/components/xs-dialog/xs-dialog';
import { XsInputNumber } from '../../../../../shared/components/xs-input-number/xs-input-number';
import { XsLoader } from '../../../../../shared/components/xs-loader/xs-loader';
import { XsTextArea } from '../../../../../shared/components/xs-text-area/xs-text-area';
import { XsToast } from '../../../../../shared/components/xs-toast/xs-toast';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'xs-cash-session-view',
  imports: [CurrencyPipe, DatePipe, ReactiveFormsModule, XsButton, XsDialog, XsInputNumber, XsLoader, XsTextArea, XsToast],
  templateUrl: './xs-cash-session-view.html',
  styleUrl: './xs-cash-session-view.scss'
})
export class XsCashSessionView implements AfterViewInit {
  @ViewChild('cashLoader') private loader!: XsLoader;
  @ViewChild('cashToast') private toast!: XsToast;

  public currentSession?: CashSessionModel;
  public history: CashSessionModel[] = [];
  public historyPage = 0;
  public historyHasMore = false;
  public openDialogVisible = false;
  public closeDialogVisible = false;
  public historyDialogVisible = false;
  public salesDialogVisible = false;
  public salesSummary?: CashSessionSalesSummary;
  public closeSalesSummary?: CashSessionSalesSummary;

  public readonly openForm = new FormGroup({
    openingAmount: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    openingComment: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(500)] })
  });
  public readonly closeForm = new FormGroup({
    closingAmount: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    closingComment: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(500)] })
  });

  constructor(
    private readonly cashSessionUseCase: CashSessionUseCase,
    private readonly saleUseCase: SaleUseCase,
    private readonly errorHandler: ErrorHandlerService
  ) {}

  ngAfterViewInit(): void { setTimeout(() => this.loadCurrentSession()); }

  loadCurrentSession(): void {
    this.loader.show('Consultando estado de caja...');
    this.cashSessionUseCase.existsOpen().subscribe({
      next: response => {
        if (!response.success || !response.data) {
          this.currentSession = undefined;
          this.loader.hide();
          return;
        }
        this.cashSessionUseCase.getCurrent().pipe(finalize(() => this.loader.hide())).subscribe({
          next: current => this.currentSession = current.success ? current.data : undefined,
          error: error => this.showError(error, 'consultar', 'caja')
        });
      },
      error: error => {
        this.loader.hide();
        this.showError(error, 'consultar', 'caja');
      }
    });
  }

  showOpenDialog(): void {
    this.openForm.reset({ openingAmount: 0, openingComment: '' });
    this.openDialogVisible = true;
  }

  openSession(): void {
    if (!this.isValid(this.openForm)) return;
    const value = this.openForm.getRawValue();
    this.loader.show('Abriendo caja...');
    this.cashSessionUseCase.open({
      cashRegisterId: 1,
      openingAmount: value.openingAmount,
      openingComment: value.openingComment.trim() || undefined
    }).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (response.success && response.data) {
          this.currentSession = response.data;
          this.openDialogVisible = false;
          this.toast.show('Caja abierta correctamente.');
        } else this.toast.show(response.message || 'No se pudo abrir la caja.', 'error');
      },
      error: error => this.showError(error, 'abrir', 'caja')
    });
  }

  showCloseDialog(): void {
    if (!this.currentSession) return;
    this.closeForm.reset({ closingAmount: 0, closingComment: '' });
    this.closeDialogVisible = true;
    this.loadSalesSummary(this.currentSession.id, 'close');
  }

  showSalesDialog(): void {
    if (!this.currentSession) return;
    this.salesSummary = undefined;
    this.salesDialogVisible = true;
    this.loadSalesSummary(this.currentSession.id, 'dialog');
  }

  closeSession(): void {
    if (!this.currentSession || !this.isValid(this.closeForm)) return;
    const value = this.closeForm.getRawValue();
    this.loader.show('Cerrando caja...');
    this.cashSessionUseCase.close(this.currentSession.id, {
      closingAmount: value.closingAmount,
      closingComment: value.closingComment.trim() || undefined
    }).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (response.success) {
          this.currentSession = undefined;
          this.closeDialogVisible = false;
          this.toast.show('Caja cerrada correctamente.');
        } else this.toast.show(response.message || 'No se pudo cerrar la caja.', 'error');
      },
      error: error => this.showError(error, 'cerrar', 'caja')
    });
  }

  showHistory(): void {
    this.history = [];
    this.historyPage = 0;
    this.historyHasMore = false;
    this.historyDialogVisible = true;
    this.loadHistory();
  }

  loadHistory(): void {
    this.loader.show('Cargando historial de cajas...');
    this.cashSessionUseCase.getHistory(this.historyPage, environment.CASH_SESSION_HISTORY_PAGE_SIZE).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (response.success && response.data) {
          this.history = [...this.history, ...response.data.items];
          this.historyHasMore = response.data.hasMore;
          this.historyPage++;
        } else this.toast.show(response.message || 'No se pudo cargar el historial.', 'error');
      },
      error: error => this.showError(error, 'cargar', 'historial de cajas')
    });
  }

  differenceClass(value?: number): string {
    if (value === undefined || value === 0) return '';
    return value > 0 ? 'cash-session__positive' : 'cash-session__negative';
  }

  closeDifference(): number {
    return this.closeForm.controls.closingAmount.value - (this.currentSession?.expectedAmount ?? 0);
  }

  closeDifferenceLabel(): string {
    const difference = this.closeDifference();
    return difference === 0 ? 'Caja cuadrada' : difference > 0 ? 'Sobrante detectado' : 'Faltante detectado';
  }

  paymentMethodLabel(method: string): string {
    return ({ CASH: 'Efectivo', YAPE: 'Yape', CARD: 'Tarjeta', TRANSFER: 'Transferencia' } as Record<string, string>)[method] ?? method;
  }

  paymentMethodIcon(method: string): string {
    return ({ CASH: 'fa-solid fa-money-bill-wave', YAPE: 'fa-solid fa-mobile-screen-button', CARD: 'fa-regular fa-credit-card', TRANSFER: 'fa-solid fa-building-columns' } as Record<string, string>)[method] ?? 'fa-solid fa-wallet';
  }

  salePaymentMethods(sale: CashSessionSale): string {
    return sale.payments.map(payment => this.paymentMethodLabel(payment.paymentMethod)).join(' + ');
  }

  private loadSalesSummary(sessionId: number, target: 'dialog' | 'close'): void {
    this.loader.show(target === 'close' ? 'Preparando arqueo de caja...' : 'Cargando ventas de la caja...');
    this.saleUseCase.getCashSessionSummary(sessionId).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (response.success && response.data) {
          if (target === 'close') this.closeSalesSummary = response.data;
          else this.salesSummary = response.data;
          return;
        }
        this.toast.show(response.message || 'No se pudo cargar el detalle de ventas.', 'error');
      },
      error: error => this.showError(error, 'cargar', 'ventas de la caja')
    });
  }

  private isValid(form: FormGroup): boolean {
    form.markAllAsTouched();
    return form.valid;
  }

  private showError(error: Parameters<ErrorHandlerService['getErrorMessage']>[0], action: string, entity: string): void {
    this.toast.show(this.errorHandler.getErrorMessage(error, action, entity), 'error');
  }
}
