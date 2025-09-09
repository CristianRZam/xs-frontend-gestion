import { Component, EventEmitter, Input, Output } from '@angular/core';
import { XsButton } from "../xs-button/xs-button";

@Component({
  selector: 'xs-page-header',
  imports: [XsButton],
  templateUrl: './xs-page-header.html',
  styleUrl: './xs-page-header.scss'
})
export class XsPageHeader {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() buttonText: string = 'Volver';

  @Output() onNew = new EventEmitter<void>();

  handleClick() {
    window.history.back();
    this.onNew.emit();
  }
}
