import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';
import { InventoryCountUseCase } from '../../../../../core/application/use-cases/inventory-count.usecase';
import { InventoryCountCloseRequest } from '../../../../../core/domain/dtos/resquests/inventory-count.request';
import { InventoryCountDetail, InventoryCountDetailItem, InventoryCountSession } from '../../../../../core/domain/models/inventory-count.model';
import { ErrorHandlerService } from '../../../../../shared/services/error-handler.service';
import { XsButton } from '../../../../../shared/components/xs-button/xs-button';
import { XsConfirmDialog } from '../../../../../shared/components/xs-confirm-dialog/xs-confirm-dialog';
import { XsDialog } from '../../../../../shared/components/xs-dialog/xs-dialog';
import { XsLoader } from '../../../../../shared/components/xs-loader/xs-loader';
import { XsToast } from '../../../../../shared/components/xs-toast/xs-toast';
import { XsInventoryMovementHistory } from '../../../../../shared/components/xs-inventory-movement-history/xs-inventory-movement-history';

type CountStage = 'EMPTY' | 'COUNTING' | 'REVIEW';

@Component({
  selector: 'xs-inventory-count-view',
  imports: [DatePipe, XsButton, XsConfirmDialog, XsDialog, XsLoader, XsToast, XsInventoryMovementHistory],
  templateUrl: './xs-inventory-count-view.html',
  styleUrl: './xs-inventory-count-view.scss'
})
export class XsInventoryCountView implements AfterViewInit {
  @ViewChild('loader') private loader!: XsLoader;
  @ViewChild('toast') private toast!: XsToast;
  @ViewChild('closeConfirm') private closeConfirm!: XsConfirmDialog;

  public stage: CountStage = 'EMPTY';
  public session?: InventoryCountSession;
  public detail?: InventoryCountDetail;
  public history: InventoryCountSession[] = [];
  public historyVisible = false;
  public historyDetail?: InventoryCountDetail;
  public historyDetailVisible = false;
  public movementProduct?: InventoryCountDetailItem;
  public movementHistoryVisible = false;

  get count(): InventoryCountDetail { return this.detail!; }

  constructor(private readonly inventoryCountUseCase: InventoryCountUseCase, private readonly errorHandler: ErrorHandlerService) {}

  ngAfterViewInit(): void { setTimeout(() => this.restore()); }

  start(): void {
    this.loader.show('Iniciando conteo...');
    this.inventoryCountUseCase.open().pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (!response.success || !response.data) return this.toast.show(response.message || 'No se pudo iniciar el conteo.', 'error');
        this.session = response.data;
        this.stage = 'COUNTING';
        this.loadDetail(response.data.id);
      }, error: error => this.showError(error, 'iniciar', 'conteo')
    });
  }

  review(): void {
    if (!this.session || !this.detail) return;
    this.fillBlankCounts();
    this.loader.show('Validando conteo...');
    this.inventoryCountUseCase.review(this.session.id, this.request()).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (!response.success || !response.data) return this.toast.show(response.message || 'No se pudo validar el conteo.', 'error');
        this.detail = response.data;
        this.session = response.data.session;
        this.stage = 'REVIEW';
        this.toast.show('Conteo validado. Revisa las diferencias antes de finalizar.');
      }, error: error => this.showError(error, 'validar', 'conteo')
    });
  }

  confirmClose(): void {
    if (!this.hasAdjustmentReasons()) return this.toast.show('Indica el motivo de cada ajuste seleccionado.', 'error');
    this.closeConfirm.show({ message: 'Se aplicarán los ajustes seleccionados y el conteo quedará guardado en el historial.', onClickAceptar: () => this.close() });
  }

  edit(): void { this.stage = 'COUNTING'; this.detail?.items.forEach(item => { item.applyAdjustment = false; item.reason = undefined; }); }

  setPhysicalStock(item: InventoryCountDetailItem, value: string): void {
    item.item.physicalStock = value === '' ? undefined : Number(value);
    item.suggested = false;
  }

  loadHistory(): void {
    this.historyVisible = true;
    this.loader.show('Cargando historial de conteos...');
    this.inventoryCountUseCase.history().pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => this.history = response.success && response.data ? response.data : [],
      error: error => this.showError(error, 'cargar', 'historial de conteos')
    });
  }

  showHistoryDetail(id: number): void {
    this.loader.show('Cargando detalle del conteo...');
    this.inventoryCountUseCase.detail(id).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => { if (response.success && response.data) { this.historyDetail = response.data; this.historyDetailVisible = true; } },
      error: error => this.showError(error, 'cargar', 'detalle del conteo')
    });
  }

  showProductMovements(product: InventoryCountDetailItem): void {
    this.movementProduct = product;
    this.movementHistoryVisible = true;
  }

  onMovementHistoryClose(): void {
    this.movementHistoryVisible = false;
  }

  statusLabel(status?: string): string { return ({ OPEN: 'Abierto', REVIEW: 'En revisión', CLOSED: 'Finalizado', CANCELLED: 'Cancelado' } as Record<string, string>)[status ?? ''] ?? 'Pendiente'; }
  resultLabel(status?: string): string { return ({ MATCHED: 'Coincide', SHORTAGE: 'Faltante', SURPLUS: 'Sobrante', PENDING: 'Pendiente' } as Record<string, string>)[status ?? ''] ?? 'Pendiente'; }
  differenceClass(item: InventoryCountDetailItem): string { return item.item.resultStatus === 'MATCHED' ? 'text-green-600 dark:text-green-400' : item.item.resultStatus === 'SHORTAGE' ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'; }

  private restore(): void {
    this.loader.show('Consultando conteo activo...');
    this.inventoryCountUseCase.current().pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => {
        if (!response.success || !response.data) return;
        this.session = response.data;
        this.stage = response.data.status === 'REVIEW' ? 'REVIEW' : 'COUNTING';
        this.loadDetail(response.data.id);
      }, error: error => this.showError(error, 'consultar', 'conteo activo')
    });
  }

  private loadDetail(id: number): void {
    this.loader.show('Cargando productos del conteo...');
    this.inventoryCountUseCase.detail(id).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => { if (response.success && response.data) { this.detail = response.data; this.session = response.data.session; } },
      error: error => this.showError(error, 'cargar', 'productos del conteo')
    });
  }

  private fillBlankCounts(): void { this.detail?.items.forEach(row => { if (row.item.physicalStock === undefined || row.item.physicalStock === null) { row.item.physicalStock = row.currentStock; row.suggested = true; } }); }
  private request(): InventoryCountCloseRequest { return { items: (this.detail?.items ?? []).map(row => ({ productId: row.item.productId, physicalStock: row.item.physicalStock ?? 0, applyAdjustment: row.applyAdjustment ?? false, reason: row.reason?.trim() || undefined })) }; }
  private hasAdjustmentReasons(): boolean { return (this.detail?.items ?? []).every(row => !row.applyAdjustment || !!row.reason?.trim()); }
  private close(): void {
    if (!this.session) return;
    this.loader.show('Finalizando conteo...');
    this.inventoryCountUseCase.close(this.session.id, this.request()).pipe(finalize(() => this.loader.hide())).subscribe({
      next: response => { if (response.success) { this.stage = 'EMPTY'; this.session = undefined; this.detail = undefined; this.toast.show('Conteo finalizado y guardado en el historial.'); } else this.toast.show(response.message || 'No se pudo finalizar el conteo.', 'error'); },
      error: error => this.showError(error, 'finalizar', 'conteo')
    });
  }
  private showError(error: Parameters<ErrorHandlerService['getErrorMessage']>[0], action: string, entity: string): void { this.toast.show(this.errorHandler.getErrorMessage(error, action, entity), 'error'); }
}
