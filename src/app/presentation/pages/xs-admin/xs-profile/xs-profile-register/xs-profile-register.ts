import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {XsDialog} from "../../../../../shared/components/xs-dialog/xs-dialog";
import {XsInputText} from "../../../../../shared/components/xs-input-text/xs-input-text";
import {XsSelect} from "../../../../../shared/components/xs-select/xs-select";
import {XsToast} from "../../../../../shared/components/xs-toast/xs-toast";
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';
import {FormRegistrarConfig} from './form-register-config';
import {ProfileRequest} from '../../../../../core/domain/dtos/resquests/profile.request';
import {Formvalidators} from '../../../../../shared/validators/form-validators';
import {ProfileFormResponse} from '../../../../../core/domain/dtos/responses/profile-form.response';

@Component({
  selector: 'xs-profile-register',
    imports: [
        ReactiveFormsModule,
        XsDialog,
        XsInputText,
        XsSelect,
        XsToast
    ],
  templateUrl: './xs-profile-register.html',
  styleUrl: './xs-profile-register.scss'
})
export class XsProfileRegister implements OnInit {
  @ViewChild('xsToastRegister') private toast!: XsToast;

  @Output() onUpdate: EventEmitter<ProfileRequest> = new EventEmitter();

  maxLengthDocument: number = 8;

  public readonly NUMBER_DIGITS_DNI = 8;
  public readonly NUMBER_DIGITS_OTHER_DOCUMENT = 20;

  dialogModel: { header?: string, display?: boolean, showOkButton?: boolean } = { header: '', display: false, showOkButton: true };
  public profileRequest: ProfileRequest = {};

  public constructor(
    public formConfig: FormRegistrarConfig,
    private util: Formvalidators,
  ) {
  }
  public typeDocuments: ParameterModel[] = [];


  ngOnInit(): void {
    this.formConfig.configForm();
  }

  openDialog( item: ProfileFormResponse | null = null) {
    this.dialogModel.header = "Editar mis datos";

    this.formConfig.formulario.reset();
    this.formConfig.configForm();

    if (item?.user) {
      this.formConfig.formulario.patchValue({
        idUser: item.user.idUser,
        typeDocument: item.user.person?.typeDocument,
        document: item.user.person?.document,
        fullName: item.user.person?.fullName,
        phone: item.user.person?.phone,
        address: item.user.person?.address,
        email: item.user.email
      });
    }

    this.typeDocuments = item?.documentTypes!;

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
      this.profileRequest = this.formConfig.assignModel();
      this.onUpdate.emit(this.profileRequest);
    }
  }


  onChangeTypeDocument() {
    if (this.formConfig.typeDocument?.value == 1) {
      this.maxLengthDocument = this.NUMBER_DIGITS_DNI;
    } else {
      this.maxLengthDocument = this.NUMBER_DIGITS_OTHER_DOCUMENT;
    }
  }

}
