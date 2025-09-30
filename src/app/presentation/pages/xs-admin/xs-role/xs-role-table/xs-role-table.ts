import {Component, EventEmitter, Input, Output} from '@angular/core';
import {XsTable} from "../../../../../shared/components/xs-table/xs-table";
import {XsTableColumn} from '../../../../../shared/components/xs-table/xs-table.model';
import {RoleModel} from '../../../../../core/domain/models/role.model';
import {XsButton} from '../../../../../shared/components/xs-button/xs-button';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../infraestructure/persistence/auth.service';

@Component({
  selector: 'xs-role-table',
    imports: [
        XsTable,
        XsButton
    ],
  templateUrl: './xs-role-table.html',
  styleUrl: './xs-role-table.scss'
})
export class XsRoleTable {
  @Input() roles: RoleModel [] = [];
  @Input() totalRecords: number = 0;

  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @Output() updateItem: EventEmitter<RoleModel> = new EventEmitter();
  @Output() deleteItem: EventEmitter<RoleModel> = new EventEmitter();
  @Output() updateActiveItem: EventEmitter<RoleModel> = new EventEmitter();
  @Output() exportPdf: EventEmitter<any> = new EventEmitter();
  @Output() exportExcel: EventEmitter<any> = new EventEmitter();

  canExport = false;
  canCreate = false;
  canEdit = false;
  canDelete = false;
  canViewPermission =false;

  columns = [
    new XsTableColumn({ field: 'name', headerText: 'Rol', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'description', headerText: 'Descripción', displayOnInit: true, isDefault: true }),
    new XsTableColumn({
      field: 'active',
      headerText: 'Estado',
      displayOnInit: true,
      isDefault: true,
      textAlign: 'center',
      headerTextAlign: 'center',
      isBadge: true,
      badgeColorMap: { true: '#16A34A', false: '#DC2626' },
      badgeTextFn: (value) => value ? 'Habilitado' : 'Inhabilitado'
    }),
  ];

  constructor(private router: Router, private authService: AuthService) {
    const permissions = this.authService.getPermissions();
    this.canExport = permissions.includes('EXPORT_ROLE');
    this.canCreate = permissions.includes('CREATE_ROLE');
    this.canEdit = permissions.includes('EDIT_ROLE');
    this.canDelete = permissions.includes('DELETE_ROLE');
    this.canViewPermission = permissions.includes('VIEW_PERMISSION');
  }

  onAddItem() {
    this.addItem.emit();
  }

  onUpdateItem(item: RoleModel) {
    this.updateItem.emit(item);
  }

  onDeleteItem(item: RoleModel) {
   this.deleteItem.emit(item);
  }

  onEditPermission(item: RoleModel) {
    this.router.navigate([`/admin/role/${item.id}/permission`]);
  }

  onUpdateActiveItem(item: RoleModel) {
    this.updateActiveItem.emit(item);
  }

  onExportPdf($event: any) {
    this.exportPdf.emit($event);
  }

  onExportExcel($event: any) {
    this.exportExcel.emit($event);
  }
}
