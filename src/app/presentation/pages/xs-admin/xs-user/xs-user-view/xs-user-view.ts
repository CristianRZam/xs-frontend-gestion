import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { XsPageHeader } from "../../../../../shared/components/xs-page-header/xs-page-header";
import { XsUserCardDetail } from "../xs-user-card-detail/xs-user-card-detail";
import { XsUserFilter } from "../xs-user-filter/xs-user-filter";
import { XsUserTable } from "../xs-user-table/xs-user-table";
import {XsLoader} from '../../../../../shared/components/xs-loader/xs-loader';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';
import {ErrorHandlerService} from '../../../../../shared/services/error-handler.service';
import {UserUseCase} from '../../../../../core/application/use-cases/user.usecase';
import {UserModel} from '../../../../../core/domain/models/user.model';
import {XsUserRegister} from '../xs-user-register/xs-user-register';
import {UserFormResponse} from '../../../../../core/domain/dtos/responses/user-form.response';
import {UserFormRequest} from '../../../../../core/domain/dtos/resquests/user-form.request';
import {UserRequest} from '../../../../../core/domain/dtos/resquests/user.request';
import {Formvalidators} from '../../../../../shared/validators/form-validators';
import {UserViewRequest} from '../../../../../core/domain/dtos/resquests/user-view.request';
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';

@Component({
  selector: 'xs-user-view',
  imports: [
    XsPageHeader,
    XsUserCardDetail,
    XsUserFilter,
    XsUserTable,
    XsLoader,
    XsToast,
    XsUserRegister,
  ],
  templateUrl: './xs-user-view.html',
  styleUrl: './xs-user-view.scss'
})
export class XsUserView implements OnInit, AfterViewInit {
  @ViewChild('xsLoader') loader!: XsLoader;
  @ViewChild('xsToastUserView') private toast!: XsToast;
  @ViewChild(XsUserRegister) userRegister!: XsUserRegister;

  public users: UserModel[] = [];
  public typeDocuments: ParameterModel[] = [];
  public totalUsers = 0;
  public formData: UserFormResponse = {
    documentTypes: [],
    roles: []
  };


  public activeUsers = 0;
  public inactiveUsers = 0;
  public totalAdmins = 0;
  filter: UserViewRequest = {
    page: 0,
    size: 5
  };


  constructor(
    private userUseCase: UserUseCase,
    private errorHandler: ErrorHandlerService,
    private util: Formvalidators,
    ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.load();
    });
  }

  load() {
    this.loader.show('Cargando...');

    this.userUseCase.init(this.filter).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const data = response.data;
          this.users = data.users;
          this.typeDocuments = data.typeDocuments;
          this.totalUsers = data.totalUsers;
          this.activeUsers = data.activeUsers;
          this.inactiveUsers = data.inactiveUsers;
          this.totalAdmins = data.totalAdmins;
        } else {
          console.warn('No se recibieron datos válidos de roles', response);
        }
        this.loader.hide();
      },
      error: (err) => {
        console.error('Error al cargar roles', err);
        this.loader.hide();
      }
    });
  }

  loadUserById(opcion: 'AGREGAR' | 'MODIFICAR' = 'MODIFICAR', id?: number) {
    this.loader.show('Cargando datos...');

    const request: UserFormRequest = { id };
    this.userUseCase.initForm(request).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.formData = response.data;

          this.userRegister.openDialog(
            opcion,
            opcion === 'AGREGAR' ? 'Registrar nuevo usuario' : 'Editar usuario',
            this.formData
          );
        } else {
          console.warn('No se recibieron datos válidos', response);
        }
        this.loader.hide();
      },
      error: (err) => {
        console.error('Error al cargar datos', err);
        this.loader.hide();
      }
    });
  }


  updateFilter(event: UserViewRequest) {
    this.filter.typeDocuments = event.typeDocuments;
    this.filter.document = event.document;
    this.filter.fullName = event.fullName;
    this.filter.username = event.username;
    this.filter.email = event.email;
    this.filter.status = event.status;
    this.filter.page = 0;
    this.filter.size = this.filter.size || 5;

    this.load();
  }

  onAddItem() {
    this.loadUserById('AGREGAR');
  }

  onUpdateItem(item: UserModel) {
    this.loadUserById('MODIFICAR', item.id);
  }

  create(item: UserRequest) {
    this.loader.show('Guardando usuario...');
    this.userUseCase.create(item).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Usuario registrado con éxito.");
          this.load();
          this.userRegister.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo registrar al usuario.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "registrar", "usuario");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  update(item: UserRequest) {
    this.loader.show('Actualizando usuario...');
    this.userUseCase.update(item).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Usuario actualizado con éxito.");
          this.load();
          this.userRegister.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo actualizar datos del usuario.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "actualizar", "usuario");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  onDeleteItem(item: UserModel) {
    this.loader.show('Eliminando usuario...');
    this.userUseCase.delete(item.id!).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Usuario eliminado correctamente.");
          this.load();
        } else {
          this.toast.show(res.message || "No se pudo eliminar al usuario.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "eliminar", "usuario");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  onUpdateActiveItem(item: UserModel) {
    this.loader.show('Actualizando...');
    this.userUseCase.updateStatus(item.id!).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Usuario actualizado correctamente.");
          this.load();
        } else {
          this.toast.show(res.message || "No se pudo actualizar el estado del usuario.", 'error');
        }
      },
      error: (e) => {
        const msg = this.errorHandler.getErrorMessage(e, "actualizar", "usuario");
        this.toast.show(msg, 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }

  exportPdf($event: any) {
    this.loader.show('Generando PDF...');
    this.userUseCase.exportPdf(this.filter).subscribe({
      next: (blob) => {
        this.util.downloadFile(blob, 'users_report.pdf');
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
    this.userUseCase.exportExcel(this.filter).subscribe({
      next: (blob) => {
        this.util.downloadFile(blob, 'users_report.xlsx');
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
}
