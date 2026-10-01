import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { finalize } from 'rxjs';
import { InventoryMovementUseCase } from '../../../core/application/use-cases/inventory-movement.usecase';
import { InventoryMovement } from '../../../core/domain/models/inventory-movement.model';
import { environment } from '../../../../environments/environment';
import { XsButton } from '../xs-button/xs-button';
import { XsDialog } from '../xs-dialog/xs-dialog';

@Component({ selector: 'xs-inventory-movement-history', imports: [DatePipe, XsButton, XsDialog], templateUrl: './xs-inventory-movement-history.html', styleUrl: './xs-inventory-movement-history.scss' })
export class XsInventoryMovementHistory implements OnChanges {
  @Input() visible = false;
  @Input() productId?: number;
  @Input() productName = '';
  @Input() countOpenedAt?: string;
  @Output() closed = new EventEmitter<void>();
  movements: InventoryMovement[] = [];
  loading = false;
  loadingMore = false;
  hasMore = false;
  page = 0;
  error = '';

  constructor(private readonly useCase: InventoryMovementUseCase) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue && this.productId && (!changes['visible'].previousValue || changes['productId'])) this.loadFirstPage();
  }
  close(): void { this.closed.emit(); }
  loadMore(): void { if (this.productId && !this.loadingMore && this.hasMore) { this.loadingMore = true; this.request(this.page + 1, true); } }
  metadata(type: string): { label: string; icon: string; tone: string } {
    return ({ ENTRY: { label: 'Entrada', icon: 'fa-solid fa-box-open', tone: 'emerald' }, SALE: { label: 'Venta', icon: 'fa-solid fa-bag-shopping', tone: 'blue' }, WASTE: { label: 'Merma', icon: 'fa-solid fa-trash-can', tone: 'red' }, SALE_RETURN: { label: 'Devolución', icon: 'fa-solid fa-arrow-rotate-left', tone: 'violet' }, ADJUSTMENT: { label: 'Ajuste', icon: 'fa-solid fa-sliders', tone: 'amber' } } as Record<string, { label: string; icon: string; tone: string }>)[type] ?? { label: 'Movimiento', icon: 'fa-solid fa-clock-rotate-left', tone: 'gray' };
  }
  quantityText(movement: InventoryMovement): string { return movement.type === 'ADJUSTMENT' ? `${this.number(movement.previousStock)} → ${this.number(movement.currentStock)}` : `${['SALE', 'WASTE'].includes(movement.type) ? '-' : '+'}${this.number(movement.quantity)}`; }
  occurredDuringCount(movement: InventoryMovement): boolean { return !!this.countOpenedAt && new Date(movement.createdAt) >= new Date(this.countOpenedAt); }
  get duringCountTotal(): number { return this.movements.filter(item => this.occurredDuringCount(item)).length; }

  loadFirstPage(): void { this.movements = []; this.hasMore = false; this.error = ''; this.page = 0; this.loading = true; this.request(0, false); }
  private request(page: number, append: boolean): void {
    if (!this.productId) return;
    this.useCase.findByProduct(this.productId, page, environment.INVENTORY_MOVEMENT_PAGE_SIZE).pipe(finalize(() => { this.loading = false; this.loadingMore = false; })).subscribe({
      next: response => { if (!response.success || !response.data) { this.error = response.message || 'No se pudo cargar el historial de movimientos.'; return; } this.movements = append ? [...this.movements, ...response.data.movements] : response.data.movements; this.page = response.data.page; this.hasMore = response.data.hasMore; },
      error: () => this.error = 'No se pudo cargar el historial de movimientos. Inténtalo nuevamente.'
    });
  }
  private number(value?: number): string { return Number(value ?? 0).toLocaleString('es-PE', { maximumFractionDigits: 2 }); }
}
