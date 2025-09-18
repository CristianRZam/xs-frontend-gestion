import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { XsPageHeader } from '../../../../../shared/components/xs-page-header/xs-page-header';
import { XsRoleCardDetail } from '../xs-role-card-detail/xs-role-card-detail';
import { XsRoleFilter } from '../xs-role-filter/xs-role-filter';
import { XsRoleTable } from '../xs-role-table/xs-role-table';
import { RoleUseCase } from '../../../../../core/application/use-cases/role.usecase';
import { RoleModel } from '../../../../../core/domain/models/role.model';
import { XsLoader } from '../../../../../shared/components/xs-loader/xs-loader';
import {XsRoleRegister} from '../xs-role-register/xs-role-register';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';
import {ErrorHandlerService} from '../../../../../shared/services/error-handler.service';

@Component({
  selector: 'xs-role-view',
  imports: [
    XsPageHeader,
    XsRoleCardDetail,
    XsRoleFilter,
    XsRoleTable,
    XsRoleRegister,
    XsLoader,
    XsToast,
  ],
  templateUrl: './xs-role-view.html',
  styleUrls: ['./xs-role-view.scss']
})
export class XsRoleView implements OnInit, AfterViewInit {
  @ViewChild('xsLoader') loader!: XsLoader;
  @ViewChild('xsToastRoleView') private toast!: XsToast;
  @ViewChild(XsRoleRegister) roleRegister!: XsRoleRegister;

  roleModel: RoleModel = {};
  public roles: RoleModel[] = [];
  public totalRoles = 0;
  public activeRoles = 0;
  public inactiveRoles = 0;
  public totalPermissions = 0;
  filter: { name: string; page: number; size: number } = {
    name: '',
    page: 0,
    size: 5
  };


  constructor(private roleUsecase: RoleUseCase, private errorHandler: ErrorHandlerService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadRoles();
    });
  }

  loadRoles() {
    this.loader.show('Cargando...');

    this.roleUsecase.init(this.filter).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const data = response.data;
          this.roles = data.roles;
          this.totalRoles = data.totalRoles;
          this.activeRoles = data.activeRoles;
          this.inactiveRoles = data.inactiveRoles;
          this.totalPermissions = data.totalPermissions;
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


  updateFilter(event: { name: string } = { name: '' }) {
    this.filter.name = event.name;
    this.filter.page = 0;
    this.filter.size = this.filter.size || 5;

    this.loadRoles();
  }


  onAddItem() {
    this.roleRegister.openDialog('AGREGAR', 'Registrar nuevo rol');
  }

  onUpdateItem(item: RoleModel) {
    this.loadRoleById(item.id!);
  }

  loadRoleById(id: number) {
    this.loader.show('Cargando...');
    this.roleUsecase.getRoleById(id).subscribe({
      next: (res) => {
        this.loader.hide();
        if (res.success && res.data) {
          this.roleModel = res.data;
          this.roleRegister.openDialog('MODIFICAR', 'Editar rol', this.roleModel);
        } else {
          this.toast.show("No se pudo cargar el rol", 'error');
        }
      },
      error: (e) => {
        this.loader.hide();
        console.error('Error al cargar rol', e);
        this.toast.show("Error al cargar el rol", 'error');
      }
    });
  }



  create(item: RoleModel) {
    this.loader.show('Guardando rol...');
    this.roleUsecase.create(item).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Rol registrado con éxito.");
          this.loadRoles();
          this.roleRegister.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo registrar el rol.", 'error');
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

  update(item: RoleModel) {
    this.loader.show('Actualizando rol...');
    this.roleUsecase.update(item).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Rol actualizado correctamente.");
          this.loadRoles();
          this.roleRegister.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo actualizar el rol.", 'error');
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


  onDeleteItem(item: RoleModel) {
    this.loader.show('Eliminando rol...');
    this.roleUsecase.delete(item.id!).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Rol eliminado correctamente.");
          this.loadRoles();
        } else {
          this.toast.show(res.message || "No se pudo eliminar el rol.", 'error');
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

  onUpdateActiveItem(item: RoleModel) {
    this.loader.show('Actualizando...');
    this.roleUsecase.updateStatus(item.id!).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.show("Rol actualizado correctamente.");
          this.loadRoles();
          this.roleRegister.cerrarDialog();
        } else {
          this.toast.show(res.message || "No se pudo actualizar el rol.", 'error');
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
    this.roleUsecase.exportPdf(this.filter).subscribe({
      next: (blob) => {
        this.downloadFile(blob, 'roles_report.pdf');
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
    this.roleUsecase.exportExcel(this.filter).subscribe({
      next: (blob) => {
        this.downloadFile(blob, 'roles_report.xlsx');
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
