import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { XsDialog } from "../../../../../shared/components/xs-dialog/xs-dialog";
import { PermissionModel } from '../../../../../core/domain/models/permission.model';
import {CommonModule} from '@angular/common';

interface PermissionGroup {
  module: string;
  permissions: PermissionModel[];
}

@Component({
  selector: 'xs-profile-permission',
  templateUrl: './xs-profile-permission.html',
  styleUrls: ['./xs-profile-permission.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, XsDialog, CommonModule]
})
export class XsProfilePermission implements OnInit {

  public permissions: PermissionModel[] = [];
  dialogModel: { header?: string, display?: boolean, showOkButton?: boolean } = { header: '', display: false, showOkButton: true };
  groupedPermissions: PermissionGroup[] = [];

  constructor() { }

  ngOnInit(): void {
    // No es necesario agrupar aquí, porque permissions se define en openDialog()
  }

  openDialog(items: PermissionModel[] = []) {
    this.permissions = items;
    this.groupPermissions();  // <-- actualizar grupos aquí
    this.dialogModel.header = "Mis Permisos";
    this.dialogModel.display = true;
  }

  cerrarDialog() {
    this.dialogModel.display = false;
  }

  private groupPermissions() {
    const map = new Map<string, PermissionModel[]>();

    this.permissions.forEach(p => {
      const key = p.module || 'General';
      if (!map.has(key)) {
        map.set(key, []);
      }
      // Evitar duplicados
      if (!map.get(key)!.some(existing => existing.id === p.id)) {
        map.get(key)!.push(p);
      }
    });

    this.groupedPermissions = Array.from(map.entries())
      .map(([module, permissions]) => ({ module, permissions }))
      .sort((a, b) => a.module.localeCompare(b.module)); // Orden alfabético ascendente
  }

}
