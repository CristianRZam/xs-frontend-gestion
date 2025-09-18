import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {XsDialog} from '../../../../../shared/components/xs-dialog/xs-dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {XsInputText} from '../../../../../shared/components/xs-input-text/xs-input-text';
import {FormRegistrarConfig} from './form-register-config';
import {XsTextArea} from '../../../../../shared/components/xs-text-area/xs-text-area';
import {XsLoader} from '../../../../../shared/components/xs-loader/xs-loader';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';
import {RoleModel} from '../../../../../core/domain/models/role.model';

@Component({
  selector: 'xs-role-register',
  imports: [
    XsDialog,
    XsInputText,
    XsTextArea,
    XsToast,
    ReactiveFormsModule
  ],
  templateUrl: './xs-role-register.html',
  styleUrl: './xs-role-register.scss'
})
export class XsRoleRegister implements OnInit {
  @ViewChild('xsToastRegister') private toast!: XsToast;

  @Output() onCreate: EventEmitter<RoleModel> = new EventEmitter();
  @Output() onUpdate: EventEmitter<RoleModel> = new EventEmitter();

  dialogModel: { header?: string, display?: boolean, showOkButton?: boolean } = { header: '', display: false, showOkButton: true };
  public opcion: '' | 'AGREGAR' | 'MODIFICAR' = '';
  public rolModel: RoleModel = {};

  public constructor(
    public formConfig: FormRegistrarConfig,
    ) {
  }

  ngOnInit(): void {
    this.formConfig.configForm();
  }

  openDialog(opcion: 'AGREGAR' | 'MODIFICAR' = 'AGREGAR', header: string = 'Registrar rol', item: RoleModel | null = null) {
    this.opcion = opcion;
    this.dialogModel.header = header;

    this.formConfig.formulario.reset();
    this.formConfig.configForm();

    if (item && opcion === 'MODIFICAR') {
      this.formConfig.formulario.patchValue({
        id: item.id,
        name: item.name,
        description: item.description
      });
      this.rolModel = item;
    }

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
    this.rolModel = this.formConfig.assignModel();
    this.onCreate.emit(this.rolModel);
  }

  modificar() {
    this.rolModel = this.formConfig.assignModel();
    this.onUpdate.emit(this.rolModel);
  }

}
