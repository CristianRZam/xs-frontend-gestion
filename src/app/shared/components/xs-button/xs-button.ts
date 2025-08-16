import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'xs-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './xs-button.html',
  styleUrls: ['./xs-button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XsButton {
  @Input() label?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() size: 'small' | 'large' = 'large';

  @Input() icon?: string;
  @Input() iconPos: 'left' | 'right' | 'top' | 'bottom' = 'left';

  @Input() severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast';

  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingIcon = 'pi pi-spin pi-spinner';
  @Input() rounded = true;
  @Input() variant?: 'text' | 'outlined';
  @Input() badge?: string;

  @Input() fullWidth = false;

  @Output() xsClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    this.xsClick.emit(event);
  }
}
