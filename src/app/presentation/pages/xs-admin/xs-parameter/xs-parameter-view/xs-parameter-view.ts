import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {XsPageHeader} from '../../../../../shared/components/xs-page-header/xs-page-header';
import {XsParameterCardDetail} from '../xs-parameter-card-detail/xs-parameter-card-detail';
import {XsParameterTable} from '../xs-parameter-table/xs-parameter-table';
import {XsParameterRegister} from '../xs-parameter-register/xs-parameter-register';
import {XsLoader} from '../../../../../shared/components/xs-loader/xs-loader';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';
import {ErrorHandlerService} from '../../../../../shared/services/error-handler.service';
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';
import {ParameterUseCase} from '../../../../../core/application/use-cases/parameter.usecase';
import {XsParameterFilter} from '../xs-parameter-filter/xs-parameter-filter';
import {ParameterFormResponse} from '../../../../../core/domain/dtos/responses/parameter-form.response';
import {ParameterViewRequest} from '../../../../../core/domain/dtos/resquests/parameter-view.request';

@Component({
  selector: 'xs-parameter-view',
  imports: [
    XsPageHeader,
    XsParameterCardDetail,
    XsParameterTable,
    XsParameterRegister,
    XsLoader,
    XsToast,
    XsParameterFilter,
  ],
  templateUrl: './xs-parameter-view.html',
  styleUrl: './xs-parameter-view.scss'
})
export class XsParameterView implements OnInit, AfterViewInit {
  @ViewChild('xsLoader') loader!: XsLoader;
  @ViewChild('xsToastParameterView') private toast!: XsToast;
  @ViewChild(XsParameterRegister) parameterRegister!: XsParameterRegister;

  parameterForResponse: ParameterFormResponse = {};
  public parameters: ParameterModel[] = [];
  public totalParameters = 0;
  public activeParameters = 0;
  public inactiveParameters = 0;
  public parametersWithParent = 0;
  filter: ParameterViewRequest = {
    name: '',
    shortName: '',
    code: '',
    type: undefined,
    page: 0,
    size: 5
  };



  constructor(private parameterUsecase: ParameterUseCase, private errorHandler: ErrorHandlerService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.load();
    });
  }

  load() {
    this.loader.show('Cargando...');

    this.parameterUsecase.init(this.filter).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const data = response.data;
          this.parameters = data.parameters;
          this.totalParameters = data.totalParameters;
          this.activeParameters = data.activeParameters;
          this.inactiveParameters = data.inactiveParameters;
          this.parametersWithParent = data.parametersWithParent;
        } else {
          console.warn('No se recibieron datos válidos', response);
        }
        this.loader.hide();
      },
      error: (err) => {
        console.error('Error al cargar roles', err);
        this.loader.hide();
      }
    });
  }


  updateFilter(
    event: { name: string; shortName: string; code: string; type: number | null } = { name: '', shortName: '', code: '', type: null }
  ) {
    this.filter = {
      ...this.filter,
      name: event.name,
      shortName: event.shortName,
      code: event.code,
      type: event.type ?? undefined,
      page: 0
    };

    this.load();
  }



  onAddItem() {
    this.loadById();
  }

  onUpdateItem(item: ParameterModel) {
    this.loadById(item.id!);
  }

  loadById(id?: number) {
    this.loader.show('Cargando...');
    this.parameterUsecase.initForm(id).subscribe({
      next: (res) => {
        this.loader.hide();
        if (res.success && res.data) {
          this.parameterForResponse = res.data;
          if(id){
            this.parameterRegister.openDialog('MODIFICAR', 'Editar parámetro', this.parameterForResponse);
          }else{
            this.parameterRegister.openDialog('AGREGAR', 'Registrar nuevo parámetro', this.parameterForResponse);
          }
        } else {
          this.toast.show("No se pudo cargar el parámetro", 'error');
        }
      },
      error: (e) => {
        this.loader.hide();
        console.error('Error al cargar parámetro', e);
        this.toast.show("Error al cargar el parámetro", 'error');
      }
    });
  }



  create(item: ParameterModel) {
    this.loader.show('Guardando parametro...');
    this.parameterUsecase.create(item).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Parámetro registrado con éxito.");
          this.load();
          this.parameterRegister.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo registrar el parámetro.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "registrar", "rol");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  update(item: ParameterModel) {
    this.loader.show('Actualizando parámetro...');
    this.parameterUsecase.update(item).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Parámetro actualizado correctamente.");
          this.load();
          this.parameterRegister.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo actualizar el parámetro.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "actualizar", "rol");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }


  onDeleteItem(item: ParameterModel) {
    this.loader.show('Eliminando parámetro...');
    this.parameterUsecase.delete(item.id!).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Parámetro eliminado correctamente.");
          this.load();
        } else {
          this.toast.show(res.message || "No se pudo eliminar el parámetro.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "eliminar", "rol");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  onUpdateActiveItem(item: ParameterModel) {
    this.loader.show('Actualizando...');
    this.parameterUsecase.updateStatus(item.id!).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Parámetro actualizado correctamente.");
          this.load();
          this.parameterRegister.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo actualizar el parámetro.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "actualizar", "rol");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }


  exportPdf($event: any) {
    this.loader.show('Generando PDF...');
    this.parameterUsecase.exportPdf(this.filter).subscribe({
      next: (blob) => {
        this.downloadFile(blob, 'parameters_report.pdf');
        this.toast.show("Reporte PDF generado con éxito.");
      },
      error: (e) => {
        console.error('Error al generar PDF', e);
        this.toast.show("Error al generar PDF", 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  exportExcel($event: any) {
    this.loader.show('Generando Excel...');
    this.parameterUsecase.exportExcel(this.filter).subscribe({
      next: (blob) => {
        this.downloadFile(blob, 'parameters_report.xlsx');
        this.toast.show("Reporte Excel generado con éxito.");
      },
      error: (e) => {
        console.error('Error al generar Excel', e);
        this.toast.show("Error al generar Excel", 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  // 📌 Utilidad para descargar archivo
  private downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
