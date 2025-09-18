import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';
import {FormRegistrarConfig} from './form-register-config';
import {XsInputText} from '../../../../../shared/components/xs-input-text/xs-input-text';
import {XsSelect} from '../../../../../shared/components/xs-select/xs-select';
import {XsDialog} from '../../../../../shared/components/xs-dialog/xs-dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {XsInputNumber} from '../../../../../shared/components/xs-input-number/xs-input-number';
import {ParameterFormResponse} from '../../../../../core/domain/dtos/responses/parameter-form.response';

@Component({
  selector: 'xs-parameter-register',
  imports: [
    XsToast,
    XsInputText,
    XsSelect,
    XsDialog,
    ReactiveFormsModule,
    XsInputNumber,
  ],
  templateUrl: './xs-parameter-register.html',
  styleUrl: './xs-parameter-register.scss'
})
export class XsParameterRegister implements OnInit {
  @ViewChild('xsToastRegister') private toast!: XsToast;

  @Output() onCreate: EventEmitter<ParameterModel> = new EventEmitter();
  @Output() onUpdate: EventEmitter<ParameterModel> = new EventEmitter();

  dialogModel: { header?: string, display?: boolean, showOkButton?: boolean } = { header: '', display: false, showOkButton: true };
  public opcion: '' | 'AGREGAR' | 'MODIFICAR' = '';
  public parameterModel: ParameterModel = {};
  public types: ParameterModel [] = [];

  public constructor(
    public formConfig: FormRegistrarConfig,
  ) {
  }

  ngOnInit(): void {
    this.formConfig.configForm();
  }

  openDialog(opcion: 'AGREGAR' | 'MODIFICAR' = 'AGREGAR', header: string = 'Registrar rol', item: ParameterFormResponse | null = null) {
    this.opcion = opcion;
    this.dialogModel.header = header;

    this.formConfig.formulario.reset();
    this.formConfig.configForm();

    if (item && opcion === 'MODIFICAR') {
      this.formConfig.formulario.patchValue({
        id: item.parameter!.id,
        parameterId: item.parameter!.parameterId,
        parentParameterId: item.parameter!.parentParameterId,
        code: item.parameter!.code,
        type: item.parameter!.type,
        name: item.parameter!.name,
        shortName: item.parameter!.shortName,
        orderNumber: item.parameter!.orderNumber,
      });
      this.parameterModel = item.parameter!;
    }
    this.types = item?.types!;

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
    this.parameterModel = this.formConfig.assignModel();
    this.onCreate.emit(this.parameterModel);
  }

  modificar() {
    this.parameterModel = this.formConfig.assignModel();
    this.onUpdate.emit(this.parameterModel);
  }

}

