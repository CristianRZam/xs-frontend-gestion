import {Component, EventEmitter, Output} from '@angular/core';
import {XsButton} from "../xs-button/xs-button";

@Component({
  selector: 'xs-filter-buttons',
    imports: [
        XsButton
    ],
  templateUrl: './xs-filter-buttons.html',
  styleUrl: './xs-filter-buttons.scss'
})
export class XsFilterButtons {
  @Output() filter = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();

  onClickFilter(): void {
    this.filter.emit();
  }

  onClickClear(): void {
    this.clear.emit();
  }
}
