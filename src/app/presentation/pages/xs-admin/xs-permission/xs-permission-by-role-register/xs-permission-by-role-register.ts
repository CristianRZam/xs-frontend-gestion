import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XsCard } from '../../../../../shared/components/xs-card/xs-card';
import { XsButton } from '../../../../../shared/components/xs-button/xs-button';
import { PermissionModel } from '../../../../../core/domain/models/permission.model';
import { AuthService } from '../../../../../infraestructure/persistence/auth.service';

@Component({
  selector: 'xs-permission-by-role-register',
  standalone: true,
  imports: [CommonModule, XsCard, XsButton],
  templateUrl: './xs-permission-by-role-register.html',
  styleUrls: ['./xs-permission-by-role-register.scss']
})
export class XsPermissionByRoleRegister {
  @Input() permissions: PermissionModel[] = [];
  @Input() assignedPermissions: PermissionModel[] = [];

  @Output() saved = new EventEmitter<number[]>();

  canEdit: boolean = false;
  objectFn = Object; // para poder usar Object.keys en la vista

  constructor(private authService: AuthService) {
    const permissions = this.authService.getPermissions();
    this.canEdit = permissions.includes('ASSIGN_PERMISSION');
  }

  isAssigned(permission: PermissionModel): boolean {
    return this.assignedPermissions.some(p => p.id === permission.id);
  }

  togglePermission(permission: PermissionModel): void {
    if (this.isAssigned(permission)) {
      this.assignedPermissions = this.assignedPermissions.filter(p => p.id !== permission.id);
    } else {
      this.assignedPermissions = [...this.assignedPermissions, permission];
    }
  }

  onSave(): void {
    const selectedIds = this.assignedPermissions
      .map(p => p.id)
      .filter((id): id is number => id !== undefined);
    this.saved.emit(selectedIds);
  }

  // Agrupar permisos por módulo
  get groupedPermissions(): Record<string, PermissionModel[]> {
    return this.permissions.reduce((groups: Record<string, PermissionModel[]>, perm) => {
      const key = perm.module || 'Otros';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(perm);
      return groups;
    }, {});
  }
}
