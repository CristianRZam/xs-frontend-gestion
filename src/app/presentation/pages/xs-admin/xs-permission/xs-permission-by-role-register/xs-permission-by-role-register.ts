import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XsCard } from '../../../../../shared/components/xs-card/xs-card';
import { XsButton } from '../../../../../shared/components/xs-button/xs-button';
import { PermissionModel } from '../../../../../core/domain/models/permission.model';

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

}
