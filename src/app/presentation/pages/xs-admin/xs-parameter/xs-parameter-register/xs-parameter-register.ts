import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { XsToast } from '../../../../../shared/components/xs-toast/xs-toast';
import { ParameterModel } from '../../../../../core/domain/models/parameter.model';
import { FormRegisterConfig } from './form-register-config';
import { XsInputText } from '../../../../../shared/components/xs-input-text/xs-input-text';
import { XsSelect } from '../../../../../shared/components/xs-select/xs-select';
import { XsDialog } from '../../../../../shared/components/xs-dialog/xs-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { XsInputNumber } from '../../../../../shared/components/xs-input-number/xs-input-number';
import { ParameterFormResponse } from '../../../../../core/domain/dtos/responses/parameter-form.response';
import { XsInputFile } from '../../../../../shared/components/xs-input-file/xs-input-file';
import {Formvalidators} from '../../../../../shared/validators/form-validators';

@Component({
  selector: 'xs-parameter-register',
  imports: [
    XsToast,
    XsInputText,
    XsSelect,
    XsDialog,
    ReactiveFormsModule,
    XsInputNumber,
    XsInputFile
  ],
  templateUrl: './xs-parameter-register.html',
  styleUrls: ['./xs-parameter-register.scss']
})
export class XsParameterRegister implements OnInit {
  @ViewChild('xsToastRegister') private toast!: XsToast;

  @Output() onCreate = new EventEmitter<{ model: ParameterModel, file: File | null }>();
  @Output() onUpdate = new EventEmitter<{ model: ParameterModel, file: File | null }>();
  @Output() onDownload = new EventEmitter<string>();


  dialogModel = { header: '', display: false, showOkButton: true };
  public opcion: '' | 'AGREGAR' | 'MODIFICAR' = '';
  public parameterModel: ParameterModel = {};
  public types: ParameterModel[] = [];
  public selectedType: number | null = null;
  public maxFileSize: number = 100 * 1024 * 1024;

  constructor(
    public formConfig: FormRegisterConfig,
    private util: Formvalidators,
  ) {}

  ngOnInit(): void {
    this.formConfig.configForm();
    this.formConfig.formulario.get('type')?.valueChanges.subscribe(value => {
      this.selectedType = value;
    });
  }

  openDialog(opcion: 'AGREGAR' | 'MODIFICAR' = 'AGREGAR', header: string = 'Registrar rol', item: ParameterFormResponse | null = null) {
    this.opcion = opcion;
    this.dialogModel.header = header;

    this.formConfig.formulario.reset();
    this.formConfig.configForm();

    if (item && opcion === 'MODIFICAR') {
      this.formConfig.formulario.patchValue(item.parameter!);
      this.parameterModel = item.parameter!;
      this.selectedType = item.parameter?.type ?? null;
    } else {
      this.parameterModel = {};
      this.selectedType = null;
    }

    // --- 🔍 Filtrado de types disponibles ---
    // 1. Types activos y no eliminados
    const typesDisponibles = item?.types?.filter(t => !t.deleted && t.active) ?? [];

    // 2. Type inactivo o eliminado que pertenece al parámetro actual (si lo tuviera)
    const typeAsignadoNoDisponible = item?.types?.filter(
      t => t.parameterId === item?.parameter?.type && (t.deleted || !t.active)
    ) ?? [];

    // 3. Unimos ambos para que el combo muestre también el eliminado si corresponde
    this.types = [...typesDisponibles, ...typeAsignadoNoDisponible];

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
    const event = this.util.formSubmitEvent(this.formConfig.formulario);

    if (event.error) {
      this.toast.show(event.mensaje!, 'error', 'Parámetro');
      return;
    }

    this.parameterModel = this.formConfig.assignModel();

    let file: File | null = null;

    if (this.selectedType === 1) {
      const fileControl = this.formConfig.formulario.get("name")?.value;

      if (fileControl instanceof File) {
        file = fileControl;
        this.parameterModel.name = file.name;
      } else if (!this.parameterModel.name) {
        this.parameterModel.name = "sin_archivo";
      }
    }

    if (this.opcion === 'AGREGAR') {
      this.onCreate.emit({ model: this.parameterModel, file });
    } else if (this.opcion === 'MODIFICAR') {
      this.onUpdate.emit({ model: this.parameterModel, file });
    }
  }

  onTypeChange(event: any) {
    this.selectedType = event.value;

    const nameControl = this.formConfig.formulario.get('name');
    if (nameControl) {
      nameControl.reset();
    }

    this.parameterModel.name = undefined;
  }

  onFileTooLarge(size: number) {
    const maxMB = this.util.bytesToMB(this.maxFileSize);
    const currentMB = this.util.bytesToMB(size);

    this.toast.show(
      `El archivo (${currentMB} MB) excede el tamaño máximo permitido de ${maxMB} MB.`,
      'error',
      'Archivo demasiado grande'
    );
  }

  download(name: string) {
    this.onDownload.emit(name);
  }
}
