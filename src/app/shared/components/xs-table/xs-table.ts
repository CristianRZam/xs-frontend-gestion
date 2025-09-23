import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import { XsConfirmDialog } from "../xs-confirm-dialog/xs-confirm-dialog";
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { XsButton } from "../xs-button/xs-button";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {XsTableColumnModel} from './xs-table.model';

@Component({
  selector: 'xs-table',
  imports: [
    CommonModule,
    XsConfirmDialog,
    TableModule,
    ReactiveFormsModule,
    XsButton,
],
  templateUrl: './xs-table.html',
  styleUrl: './xs-table.scss',
})
export class XsTable implements OnInit {
  @Input() keyConfirmDialog: string = 'tableKey';
  @Input() columns: XsTableColumnModel[] = [];
  @Input() totalRecords: number = 0;
  @Input() dataSource: any[] = [];
  @Input() selectByCheckbox: boolean = false;
  @Input() showRowNumbers: boolean = true;
  @Input() title: string = '';
  @Input() showTitle: boolean = true;
  @Input() rowID: string = '';
  @Input() disabled: boolean = false;
  @Input() showRowsPerPage: boolean = false;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
  @Input() paginator: boolean = true;
  @Input() showCurrentPageReport: boolean = false;
  @Input() lazy: boolean = false;

  @Input() buttonsColumnWidth: number = 60;
  @Input() showOptionsColumn: boolean = true;
  @Input() addButtonLabel: string = 'Nuevo';
  @Input() addButtonIcon: string = 'fa fa-plus';
  @Input() addButtonShow: boolean = false;
  @Input() editButtonIcon: string = 'fa-regular fa-pen-to-square';
  @Input() editButtonShow: boolean = true;
  @Input() deleteButtonIcon: string = 'fa-regular fa-trash-can';
  @Input() deleteButtonShow: boolean = true;
  @Input() statusToggleButtonActive: boolean = false;
  @Input() exportExcelButtonShow: boolean = false;
  @Input() exportExcelButtonIcon: string = 'fa-regular fa-file-excel';
  @Input() exportPdfButtonShow: boolean = false;
  @Input() exportPdfButtonIcon: string = 'fa-regular fa-file-pdf';


  @Output() selectedRow: EventEmitter<any> = new EventEmitter();
  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @Output() updateItem: EventEmitter<any> = new EventEmitter();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateActiveItem: EventEmitter<any> = new EventEmitter();
  @Output() exportExcel: EventEmitter<any> = new EventEmitter();
  @Output() exportPdf: EventEmitter<any> = new EventEmitter();
  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();

  @ContentChild('additionalTableButtons', { read: TemplateRef }) additionalTableButtons!: TemplateRef<unknown>;

  @ViewChild('xsConfirmDialog') private confirmDialog!: XsConfirmDialog;

  public selectedItems: any[] = [];
  public formulario!: FormGroup;
  get columnsToDisplaySelected(): AbstractControl | null { return this.formulario.get('columnsToDisplaySelected'); }

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      columnsToDisplaySelected: [[], []],
    });
  }


  loadLazyData(event: any) {
    this.lazyLoad.emit(event);
  }

  onSelectedRow(item: any) {
    this.selectedRow.emit(item);
  }

  onClickAdd() {
    this.addItem.emit();
  }

  onClickUpdate(item: any) {
    this.updateItem.emit(item);
  }

  onClickDelete(item: any) {
    this.confirmDialog.show({
      message: '¿Está seguro(a) que desea eliminar el ítem?',
      onClickAceptar: () => this.delete(item),
    });
  }

  delete(item: any): void {
    this.deleteItem.emit(item);
  }

  onClickToggleActive(item: any) {
    this.confirmDialog.show({
      message: '¿Está seguro(a) que desea cambiar el estado?',
      onClickAceptar: () => this.toggleActive(item),
    });
  }

  private toggleActive(item: any): void {
    this.onUpdateActiveItem.emit(item);
  }

  onClickExportar(tipo: 'EXCEL' | 'PDF') {
    if (tipo == 'EXCEL') {
      this.exportExcel.emit(this.columnsToDisplaySelected?.value);
    }
    if (tipo == 'PDF') {
      this.exportPdf.emit(this.columnsToDisplaySelected?.value);
    }
  }

  getTextColor(bgHex: string): string {
    const c = bgHex.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const brightness = (r*299 + g*587 + b*114) / 1000;
    return brightness > 125 ? '#000000' : '#ffffff';
  }

  getValue(item: any, field: string | undefined): any {
    if (!field) return '';
    return field.split('.').reduce((acc, key) => acc?.[key], item);
  }

}

