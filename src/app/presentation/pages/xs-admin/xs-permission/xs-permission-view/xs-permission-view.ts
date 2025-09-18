import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {XsPageHeader} from '../../../../../shared/components/xs-page-header/xs-page-header';
import {XsPermissionByRoleRegister} from '../xs-permission-by-role-register/xs-permission-by-role-register';
import {PermissionUseCase} from '../../../../../core/application/use-cases/permission.usecase';
import {XsLoader} from '../../../../../shared/components/xs-loader/xs-loader';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';
import {RoleModel} from '../../../../../core/domain/models/role.model';
import {PermissionModel} from '../../../../../core/domain/models/permission.model';
import {PermissionUpdateRequest} from '../../../../../core/domain/dtos/resquests/permission-update.request';

@Component({
  selector: 'xs-permission-view',
  imports: [
    XsPageHeader,
    XsPermissionByRoleRegister,
    XsLoader,
    XsToast
  ],
  templateUrl: './xs-permission-view.html',
  styleUrls: ['./xs-permission-view.scss']
})
export class XsPermissionView implements OnInit, AfterViewInit {
  @ViewChild('xsLoaderPermission') loader!: XsLoader;
  @ViewChild('xsToastPermissionView') private toast!: XsToast;

  role!: RoleModel;
  allPermissions: PermissionModel[] = [];
  assignedPermissions: PermissionModel[] = [];

  private roleId!: number;

  constructor(
    private permissionUseCase: PermissionUseCase,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.route.paramMap.subscribe(params => {
        const idParam = params.get('id');
        if (idParam) {
          this.roleId = +idParam;
          this.loadPermissions();
        } else {
          console.error('No se encontró el id del rol en la ruta.');
        }
      });
    });
  }

  loadPermissions() {
    this.loader.show('Cargando...');

    this.permissionUseCase.getRoleById(this.roleId).subscribe({
      next: (response) => {
        this.loader.hide();
        if (response.success && response.data) {
          const data = response.data;

          this.role = data.role;
          this.allPermissions = data.allPermissions;
          this.assignedPermissions = data.assignedPermissions;

        } else {
          console.warn('No se recibieron datos válidos', response);
        }
      },
      error: (err) => {
        console.error('Error al cargar roles', err);
        this.loader.hide();
      }
    });
  }

  save($event: number[]) {
    if (!this.role) {
      console.error('No hay rol seleccionado');
      return;
    }

    this.loader.show('Actualizando...');

    const data: PermissionUpdateRequest = {
      roleId: this.role.id!,
      permissionIds: $event,
    };

    this.permissionUseCase.updatePermissionByRole(data).subscribe({
      next: (response) => {
        this.loader.hide();
        if (response.success && response.data) {
          this.toast.show("Permisos actualizados correctamente.");
          this.loadPermissions();
        } else {
          this.toast.show("No se actualizaron los permisos.", 'error');
          console.warn('Error: ', response);
        }
      },
      error: (err) => {
        this.toast.show("Error inesperado.", 'error');
        console.error('Error al actualizar permisos', err);
        this.loader.hide();
      }
    });
  }
}
