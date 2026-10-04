import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryMovementCreateRequest } from '../../../core/domain/models/inventory-movement.model';
import { ProductModel } from '../../../core/domain/models/product.model';
import { XsDialog } from '../xs-dialog/xs-dialog';
import { XsInputNumber } from '../xs-input-number/xs-input-number';
import { XsTextArea } from '../xs-text-area/xs-text-area';

export type InventoryRegisterType = 'ENTRY' | 'WASTE' | 'ADJUSTMENT';

@Component({ selector: 'xs-inventory-movement-register', imports: [ReactiveFormsModule, XsDialog, XsInputNumber, XsTextArea], templateUrl: './xs-inventory-movement-register.html', styleUrl: './xs-inventory-movement-register.scss' })
export class XsInventoryMovementRegister implements OnChanges {
  @Input() visible = false;
  @Input() product?: ProductModel;
  @Input() type: InventoryRegisterType = 'ENTRY';
  @Output() save = new EventEmitter<InventoryMovementCreateRequest>();
  @Output() closed = new EventEmitter<void>();

  readonly form = new FormGroup({ quantity: new FormControl<number | null>(null, [Validators.required, Validators.min(0.001)]), reason: new FormControl('') });
  ngOnChanges(): void { if (this.visible) this.form.reset(); }
  get title(): string { return this.type === 'ENTRY' ? 'Agregar inventario' : this.type === 'WASTE' ? 'Registrar merma' : 'Ajustar inventario'; }
  get action(): string { return this.type === 'ENTRY' ? 'Guardar entrada' : this.type === 'WASTE' ? 'Registrar merma' : 'Aplicar ajuste'; }
  get quantityLabel(): string { return this.type === 'ADJUSTMENT' ? 'Nuevo stock físico' : 'Cantidad'; }
  submit(): void { if (!this.product?.id) return; this.form.markAllAsTouched(); if (this.form.invalid) return; this.save.emit({ productId: this.product.id, type: this.type, quantity: Number(this.form.controls.quantity.value), reason: this.form.controls.reason.value?.trim() || undefined }); }
}
