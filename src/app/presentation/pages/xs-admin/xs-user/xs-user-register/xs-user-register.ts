import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';
import {FormRegistrarConfig} from './form-register-config';
import {ReactiveFormsModule} from '@angular/forms';
import {XsDialog} from '../../../../../shared/components/xs-dialog/xs-dialog';
import {XsInputText} from '../../../../../shared/components/xs-input-text/xs-input-text';
import {UserModel} from '../../../../../core/domain/models/user.model';
import {XsSelect} from '../../../../../shared/components/xs-select/xs-select';
import {UserFormResponse} from '../../../../../core/domain/dtos/responses/user-form.response';
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';

@Component({
  selector: 'xs-user-register',
  imports: [
    XsToast,
    ReactiveFormsModule,
    XsDialog,
    XsInputText,
    XsSelect
  ],
  templateUrl: './xs-user-register.html',
  styleUrl: './xs-user-register.scss'
})
export class XsUserRegister implements OnInit {
  @ViewChild('xsToastRegister') private toast!: XsToast;

  @Output() onCreate: EventEmitter<UserModel> = new EventEmitter();
  @Output() onUpdate: EventEmitter<UserModel> = new EventEmitter();

  dialogModel: { header?: string, display?: boolean, showOkButton?: boolean } = { header: '', display: false, showOkButton: true };
  public opcion: '' | 'AGREGAR' | 'MODIFICAR' = '';
  public userModel: UserModel = {};

  public constructor(
    public formConfig: FormRegistrarConfig,
  ) {
  }
  public typeDocuments: ParameterModel[] = [];


  ngOnInit(): void {
    this.formConfig.configForm();
  }

  openDialog(opcion: 'AGREGAR' | 'MODIFICAR' = 'AGREGAR', header: string = 'Registrar Usuario', item: UserFormResponse | null = null) {
    this.opcion = opcion;
    this.dialogModel.header = header;

    this.formConfig.formulario.reset();
    this.formConfig.configForm();

    if (item?.user && opcion === 'MODIFICAR') {
      this.formConfig.formulario.patchValue({
        id: item.user.id,
        username: item.user.username,
        email: item.user.email
      });
      this.userModel = item.user!;
    }

    this.typeDocuments = item?.documentTypes!;

    this.dialogModel.display = true;
  }


  cerrarDialog() {
    this.opcion = '';
    this.dialogModel.display = false;
  }

  onAceptarDialog() {
    this.formSubmitEvent();
  }

  formSubmitEvent(): void {
    let event = this.formConfig.formSubmitEvent();
    if(event.error) {
      this.toast.show(event.mensaje!, 'error', "Rol");
    }else {
      switch (this.opcion) {
        case 'AGREGAR':
          this.agregar();
          break;
        case 'MODIFICAR':
          this.modificar();
          break;
      }
    }
  }

  agregar() {
    this.userModel = this.formConfig.assignModel();
    this.onCreate.emit(this.userModel);
  }

  modificar() {
    this.userModel = this.formConfig.assignModel();
    this.onUpdate.emit(this.userModel);
  }
}
