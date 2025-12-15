import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {XsTable} from "../../../../../shared/components/xs-table/xs-table";
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';
import {XsTableColumn} from '../../../../../shared/components/xs-table/xs-table.model';
import {AuthService} from '../../../../../infraestructure/persistence/auth.service';
import {BirthRecordModel} from '../../../../../core/domain/models/birth-record.model';
import {BirthRecordListDTO} from '../../../../../core/domain/dtos/responses/birth-record-list.dto';
import {XsButton} from '../../../../../shared/components/xs-button/xs-button';

@Component({
  selector: 'xs-birth-record-table',
  imports: [
    XsTable,
    XsButton
  ],
  templateUrl: './xs-birth-record-table.html',
  styleUrl: './xs-birth-record-table.scss'
})
export class XsBirthRecordTable implements OnInit {
  @Input() birthRecords: BirthRecordListDTO [] = [];
  @Input() totalRecords: number = 0;

  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @Output() updateItem: EventEmitter<BirthRecordModel> = new EventEmitter();
  @Output() deleteItem: EventEmitter<BirthRecordModel> = new EventEmitter();
  @Output() downloadItem: EventEmitter<BirthRecordModel> = new EventEmitter();
  @Output() exportPdf: EventEmitter<any> = new EventEmitter();
  @Output() exportExcel: EventEmitter<any> = new EventEmitter();

  canExport = false;
  canCreate = false;
  canEdit = false;
  canDelete = false;

  columns = [
    new XsTableColumn({
      field: 'actNumber',
      headerText: 'Nº Acta',
      displayOnInit: true,
      isDefault: true
    }),

    new XsTableColumn({
      field: 'personName',
      headerText: 'Persona',
      displayOnInit: true,
      isDefault: true
    }),

    new XsTableColumn({
      field: 'birthDatetime',
      headerText: 'Fecha de Nacimiento',
      displayOnInit: true,
      isDefault: true,
      headerTextAlign: 'center',
      textAlign: 'center',
      valueFn: (row: any) => {
        if (!row.birthDatetime) return '';

        const date = new Date(row.birthDatetime);

        return date.toLocaleString('es-PE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    }),

    new XsTableColumn({
      field: 'sex',
      headerText: 'Género',
      displayOnInit: true,
      isDefault: true,
      headerTextAlign: 'center',
      textAlign: 'center'
    }),
  ];


  constructor(private authService: AuthService) {
    const permissions = this.authService.getPermissions();
    this.canExport = permissions.includes('EXPORT_PARAMETER');
    this.canCreate = permissions.includes('CREATE_PARAMETER');
    this.canEdit = permissions.includes('EDIT_PARAMETER');
    this.canDelete = permissions.includes('DELETE_PARAMETER');
  }

  ngOnInit(): void {
  }


  onAddItem() {
    this.addItem.emit();
  }

  onUpdateItem(item: ParameterModel) {
    this.updateItem.emit(item);
  }

  onDeleteItem(item: ParameterModel) {
    this.deleteItem.emit(item);
  }


  onExportPdf($event: any) {
    this.exportPdf.emit($event);
  }

  onExportExcel($event: any) {
    this.exportExcel.emit($event);
  }

  onDownload(item: any) {
    this.downloadItem.emit(item);
  }
}
