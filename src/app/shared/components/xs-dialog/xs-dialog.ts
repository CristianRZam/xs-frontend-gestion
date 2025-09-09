import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {XsButton} from '../xs-button/xs-button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'xs-dialog',
  imports: [
    DialogModule,
    XsButton,
    CommonModule,
  ],
  templateUrl: './xs-dialog.html',
  styleUrl: './xs-dialog.scss'
})
export class XsDialog implements OnInit {
  @ContentChild('content', { read: TemplateRef }) content!: TemplateRef<unknown>;

  @Input() dialogModel: any = {};
  @Input() display: boolean = false;
  @Input() header: string = '';
  @Input() okButtonLabel: string = 'Guardar';
  @Input() cancelButtonLabel: string = 'Salir';
  @Input() showOkButton: boolean = false;
  @Input() showCancelButton: boolean = true;
  @Input() isDisabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'lg';
  @Input() styleClass: string = '';
  @Input() position: "center" | "top" | "bottom" | "left" | "right" | "topleft" | "topright" | "bottomleft" | "bottomright" = "center";
  @Input() resizable: boolean = true;
  @Input() maximizable: boolean = true;
  @Input() okButtonIcon: string = "fa-regular fa-floppy-disk"
  @Output() onAceptar: EventEmitter<any> = new EventEmitter();
  @Output() onCerrar: EventEmitter<any> = new EventEmitter();
  @ContentChild('additionalButtons', { read: TemplateRef }) additionalButtons!: TemplateRef<unknown>;
  public initialWidth: string = '35vw';

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    switch (this.size) {
      case 'sm':
        this.initialWidth = '35vw';
        break;
      case 'md':
        this.initialWidth = '50vw';
        break;
      case 'lg':
        this.initialWidth = '85vw';
        break;
    }
  }

  onClickAceptar() {
    this.onAceptar.emit();
  }

  onHide() {
    this.onCerrar.emit();
  }
}
