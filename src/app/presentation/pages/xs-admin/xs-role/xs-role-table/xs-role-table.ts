import {Component, EventEmitter, Input, Output} from '@angular/core';
import {XsTable} from "../../../../../shared/components/xs-table/xs-table";
import {XsTableColumn} from '../../../../../shared/components/xs-table/xs-table.model';
import {RoleModel} from '../../../../../core/domain/models/role.model';
import {XsButton} from '../../../../../shared/components/xs-button/xs-button';
import {Router} from '@angular/router';

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


  columns = [
    new XsTableColumn({ field: 'name', headerText: 'Rol', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'active', headerText: 'Estado', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'description', headerText: 'Descripción', displayOnInit: true, isDefault: true }),
  ];

  constructor(private router: Router) {}

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
}
