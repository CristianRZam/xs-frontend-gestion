import {Component, EventEmitter, Input, Output} from '@angular/core';
import { XsTable } from '../../../../../shared/components/xs-table/xs-table';
import {UserModel} from '../../../../../core/domain/models/user.model';
import {XsTableColumn} from '../../../../../shared/components/xs-table/xs-table.model';
import {AuthService} from '../../../../../infraestructure/persistence/auth.service';

@Component({
  selector: 'xs-user-table',
  standalone: true,
  imports: [
    XsTable,
  ],
  templateUrl: './xs-user-table.html',
  styleUrls: ['./xs-user-table.scss']
})
export class XsUserTable {
  @Input() users: UserModel [] = [];
  @Input() totalRecords: number = 0;

  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @Output() updateItem: EventEmitter<UserModel> = new EventEmitter();
  @Output() deleteItem: EventEmitter<UserModel> = new EventEmitter();
  @Output() updateActiveItem: EventEmitter<UserModel> = new EventEmitter();
  @Output() exportPdf: EventEmitter<any> = new EventEmitter();
  @Output() exportExcel: EventEmitter<any> = new EventEmitter();

  canExport = false;
  canCreate = false;
  canEdit = false;
  canDelete = false;

  columns = [
    new XsTableColumn({ field: 'person.typeDocumentName', headerText: 'Tipo de Documento', displayOnInit: true, isDefault: true, textAlign: 'center', headerTextAlign: 'center', }),
    new XsTableColumn({ field: 'person.document', headerText: 'Nº Documento', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'person.fullName', headerText: 'Nombres', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'username', headerText: 'Nombre de Usuario', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'email', headerText: 'Correo Electrónico', displayOnInit: true, isDefault: true }),
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

  constructor(private authService: AuthService) {
    const permissions = this.authService.getPermissions();
    this.canExport = permissions.includes('EXPORT_USER');
    this.canCreate = permissions.includes('CREATE_USER');
    this.canEdit = permissions.includes('EDIT_USER');
    this.canDelete = permissions.includes('DELETE_USER');
  }

  onAddItem() {
    this.addItem.emit();
  }

  onUpdateItem(item: UserModel) {
    this.updateItem.emit(item);
  }

  onDeleteItem(item: UserModel) {
    this.deleteItem.emit(item);
  }

  onUpdateActiveItem(item: UserModel) {
    this.updateActiveItem.emit(item);
  }

  onExportPdf($event: any) {
    this.exportPdf.emit($event);
  }

  onExportExcel($event: any) {
    this.exportExcel.emit($event);
  }

}
