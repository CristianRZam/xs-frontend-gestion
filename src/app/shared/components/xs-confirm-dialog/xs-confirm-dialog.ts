import { Component, Input, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {XsButton} from '../xs-button/xs-button';

@Component({
  selector: 'xs-confirm-dialog',
  imports: [
    ConfirmDialogModule,
    XsButton
  ],
  templateUrl: './xs-confirm-dialog.html',
  styleUrl: './xs-confirm-dialog.scss',
  providers: [
    ConfirmationService
  ]
})
export class XsConfirmDialog implements OnInit {

  message: string = '';
  acceptCallback?: () => unknown;
  rejectCallback?: () => unknown;
  @Input() key: string = "";
  @Input() acceptButtonLabel: string = "Aceptar";
  @Input() acceptButtonIcon: string = 'fa-regular fa-circle-check';
  @Input() rejectButtonLabel: string = 'Cancelar';
  @Input() rejectButtonIcon: string = 'fa-solid fa-ban';


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
