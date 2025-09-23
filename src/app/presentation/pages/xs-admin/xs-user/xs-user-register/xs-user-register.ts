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
import {XsMultiselect} from '../../../../../shared/components/xs-multiselect/xs-multiselect';
import {RoleModel} from '../../../../../core/domain/models/role.model';
import {UserRequest} from '../../../../../core/domain/dtos/resquests/user.request';

@Component({
  selector: 'xs-user-register',
  imports: [
    XsToast,
    ReactiveFormsModule,
    XsDialog,
    XsInputText,
    XsSelect,
    XsMultiselect
  ],
  templateUrl: './xs-user-register.html',
  styleUrl: './xs-user-register.scss'
})
export class XsUserRegister implements OnInit {
  @ViewChild('xsToastRegister') private toast!: XsToast;

  @Output() onCreate: EventEmitter<UserRequest> = new EventEmitter();
  @Output() onUpdate: EventEmitter<UserRequest> = new EventEmitter();

  maxLengthDocument: number = 8;

  public readonly NUMBER_DIGITS_DNI = 8;
  public readonly NUMBER_DIGITS_OTHER_DOCUMENT = 20;

  dialogModel: { header?: string, display?: boolean, showOkButton?: boolean } = { header: '', display: false, showOkButton: true };
  public opcion: '' | 'AGREGAR' | 'MODIFICAR' = '';
  public userRequest: UserRequest = {};

  public constructor(
    public formConfig: FormRegistrarConfig,
  ) {
  }
  public typeDocuments: ParameterModel[] = [];
  public roles: RoleModel[] = [];


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
        typeDocument: item.user.person?.typeDocument,
        document: item.user.person?.document,
        fullName: item.user.person?.fullName,
        phone: item.user.person?.phone,
        address: item.user.person?.address,
        username: item.user.username,
        email: item.user.email,
        roleIds: item.user.roles?.map(r => r.id)
      });
    }

    this.typeDocuments = item?.documentTypes!;
    this.roles = item?.roles!;

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
    this.userRequest = this.formConfig.assignModel();
    this.onCreate.emit(this.userRequest);
  }

  modificar() {
    this.userRequest = this.formConfig.assignModel();
    this.onUpdate.emit(this.userRequest);
  }

  onChangeTypeDocument() {
    if (this.formConfig.typeDocument?.value == 1) {
      this.maxLengthDocument = this.NUMBER_DIGITS_DNI;
    } else {
      this.maxLengthDocument = this.NUMBER_DIGITS_OTHER_DOCUMENT;
    }
  }
}
