import { Component, Input, OnInit } from '@angular/core';
import { Confirmation } from 'primeng/api';
import * as i0 from "@angular/core";

@Component({
  selector: 'xs-confirm-dialog',
  imports: [],
  templateUrl: './xs-confirm-dialog.html',
  styleUrl: './xs-confirm-dialog.scss',
})
export class XsConfirmDialog implements OnInit {

  message: string = '';
  acceptCallback?: () => unknown;
  rejectCallback?: () => unknown;
  @Input() key: string = "";
  @Input() acceptButtonLabel: string = "Aceptar";
  @Input() rejectButtonLabel: string = "Cancelar";

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  show(config: { message: string, onClickAceptar?: () => unknown, onClickCancelar?: () => unknown }): void {
    this.message = config.message;
    this.acceptCallback = config.onClickAceptar;
    this.rejectCallback = config.onClickCancelar;
    this.confirmationService.confirm({
      message: this.message,
      key: this.key,
      accept: () => {
        this.acceptCallback = config.onClickAceptar;
      },
      reject: () => {
        this.rejectCallback = config.onClickCancelar;
      }
    });
  }

  onClickAccept() {
    if (this.acceptCallback) this.acceptCallback();
    this.confirmationService.close();
  }

  onClickReject() {
    if (this.rejectCallback) this.rejectCallback();
    this.confirmationService.close();
  }
}


export declare class ConfirmationService {
    private requireConfirmationSource;
    private acceptConfirmationSource;
    requireConfirmation$: import("rxjs").Observable<Confirmation>;
    accept: import("rxjs").Observable<Confirmation>;
    confirm(confirmation: Confirmation): this;
    close(): this;
    onAccept(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmationService>;
}
