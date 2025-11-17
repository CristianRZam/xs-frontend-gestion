import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductModel} from '../../../../../core/domain/models/product.model';
import {XsTable} from '../../../../../shared/components/xs-table/xs-table';
import {XsTableColumn} from '../../../../../shared/components/xs-table/xs-table.model';
import {AuthService} from '../../../../../infraestructure/persistence/auth.service';

@Component({
  selector: 'xs-product-table',
  imports: [
    XsTable
  ],
  templateUrl: './xs-product-table.html',
  styleUrl: './xs-product-table.scss'
})
export class XsProductTable {
  @Input() products: ProductModel[] = [];
  @Input() totalRecords: number = 0;

  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @Output() updateItem: EventEmitter<ProductModel> = new EventEmitter();
  @Output() deleteItem: EventEmitter<ProductModel> = new EventEmitter();
  @Output() updateActiveItem: EventEmitter<ProductModel> = new EventEmitter();
  @Output() exportPdf: EventEmitter<any> = new EventEmitter();
  @Output() exportExcel: EventEmitter<any> = new EventEmitter();

  canExport = false;
  canCreate = false;
  canEdit = false;
  canDelete = false;

  columns = [
    new XsTableColumn({ field: 'code', headerText: 'Código', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'name', headerText: 'Nombre', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'nameCategory', headerText: 'Categoría', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'nameUnitMeasure', headerText: 'Unidad Medida', displayOnInit: true, isDefault: true, headerTextAlign: 'center', textAlign: 'center', }),
    new XsTableColumn({
      field: 'manageVariants',
      headerText: 'Variante',
      displayOnInit: true,
      isDefault: true,
      textAlign: 'center',
      headerTextAlign: 'center',
      isBadge: true,
      badgeColorMap: { true: '#2563EB', false: '#9CA3AF' },
      badgeTextFn: (value) => value ? 'Si' : 'No'
    }),
    new XsTableColumn({ field: 'totalStock', headerText: 'Stock', displayOnInit: true, isDefault: true, headerTextAlign: 'center', textAlign: 'center', }),
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
    this.canExport = permissions.includes('EXPORT_PRODUCT');
    this.canCreate = permissions.includes('CREATE_PRODUCT');
    this.canEdit = permissions.includes('EDIT_PRODUCT');
    this.canDelete = permissions.includes('DELETE_PRODUCT');
  }

  onAddItem() {
    this.addItem.emit();
  }

  onUpdateItem(item: ProductModel) {
    this.updateItem.emit(item);
  }

  onDeleteItem(item: ProductModel) {
    this.deleteItem.emit(item);
  }

  onUpdateActiveItem(item: ProductModel) {
    this.updateActiveItem.emit(item);
  }

  onExportPdf($event: any) {
    this.exportPdf.emit($event);
  }

  onExportExcel($event: any) {
    this.exportExcel.emit($event);
  }

}
