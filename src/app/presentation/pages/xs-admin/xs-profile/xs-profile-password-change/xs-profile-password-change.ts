import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {XsInputPassword} from '../../../../../shared/components/xs-input-password/xs-input-password';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';
import {ReactiveFormsModule} from '@angular/forms';
import {Formvalidators} from '../../../../../shared/validators/form-validators';
import {FormRegisterConfig} from './form-register-config';
import {PasswordRequest} from '../../../../../core/domain/dtos/resquests/password.request';
import {XsDialog} from "../../../../../shared/components/xs-dialog/xs-dialog";

@Component({
  selector: 'xs-profile-password-change',
  imports: [
    ReactiveFormsModule,
    XsDialog,
    XsInputPassword,
    XsToast
  ],
  templateUrl: './xs-profile-password-change.html',
  styleUrl: './xs-profile-password-change.scss'
})
export class XsProfilePasswordChange implements OnInit {
  @ViewChild('xsToastChangePassword') private toast!: XsToast;

  @Output() onUpdate: EventEmitter<PasswordRequest> = new EventEmitter();


  dialogModel: { header?: string, display?: boolean, showOkButton?: boolean } = { header: '', display: false, showOkButton: true };

  public passwordRequest: PasswordRequest = {};

  public constructor(
    public formConfig: FormRegisterConfig,
    private util: Formvalidators,
  ) {
  }


  ngOnInit(): void {
    this.formConfig.configForm();
  }

  openDialog( ) {
    this.dialogModel.header = "Cambiar contraseña";

    this.formConfig.formulario.reset();
    this.formConfig.configForm();

    this.dialogModel.display = true;
  }

  cerrarDialog() {
    this.dialogModel.display = false;
  }

  onAceptarDialog() {
    this.formSubmitEvent();
  }

  formSubmitEvent(): void {
    let event = this.util.formSubmitEvent(this.formConfig.formulario);
    if(event.error) {
      this.toast.show(event.mensaje!, 'error', "Perfil");
    }else {
      this.passwordRequest = this.formConfig.assignModel();
      this.onUpdate.emit(this.passwordRequest);
    }
  }

}
