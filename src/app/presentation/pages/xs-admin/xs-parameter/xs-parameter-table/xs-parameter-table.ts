import {Component, EventEmitter, Input, Output} from '@angular/core';
import {XsTableColumn} from '../../../../../shared/components/xs-table/xs-table.model';
import {Router} from '@angular/router';
import {XsTable} from '../../../../../shared/components/xs-table/xs-table';
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';

@Component({
  selector: 'xs-parameter-table',
  imports: [
    XsTable,
  ],
  templateUrl: './xs-parameter-table.html',
  styleUrl: './xs-parameter-table.scss'
})
export class XsParameterTable {
  @Input() parameters: ParameterModel [] = [];
  @Input() totalRecords: number = 0;

  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @Output() updateItem: EventEmitter<ParameterModel> = new EventEmitter();
  @Output() deleteItem: EventEmitter<ParameterModel> = new EventEmitter();
  @Output() updateActiveItem: EventEmitter<ParameterModel> = new EventEmitter();
  @Output() exportPdf: EventEmitter<any> = new EventEmitter();
  @Output() exportExcel: EventEmitter<any> = new EventEmitter();

  columns = [
    new XsTableColumn({ field: 'name', headerText: 'Nombre', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'shortName', headerText: 'Nombre Corto', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'orderNumber', headerText: 'Orden', displayOnInit: true, isDefault: true, headerTextAlign: 'center', textAlign: 'center', }),
    new XsTableColumn({ field: 'code', headerText: 'Código', displayOnInit: true, isDefault: true, headerTextAlign: 'center', textAlign: 'center', }),
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

  constructor(private router: Router) {}

  onAddItem() {
    this.addItem.emit();
  }

  onUpdateItem(item: ParameterModel) {
    this.updateItem.emit(item);
  }

  onDeleteItem(item: ParameterModel) {
    this.deleteItem.emit(item);
  }

  onUpdateActiveItem(item: ParameterModel) {
    this.updateActiveItem.emit(item);
  }

  onExportPdf($event: any) {
    this.exportPdf.emit($event);
  }

  onExportExcel($event: any) {
    this.exportExcel.emit($event);
  }
}
