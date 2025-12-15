import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { XsPageHeader } from "../../../../../shared/components/xs-page-header/xs-page-header";
import { XsBirthRecordCardDetail } from '../xs-birth-record-card-detail/xs-birth-record-card-detail';
import { XsBirthRecordFilter } from '../xs-birth-record-filter/xs-birth-record-filter';
import { XsBirthRecordTable } from '../xs-birth-record-table/xs-birth-record-table';
import { BirthRecordModel } from '../../../../../core/domain/models/birth-record.model';
import {XsLoader} from '../../../../../shared/components/xs-loader/xs-loader';
import {BirthRecordListDTO} from '../../../../../core/domain/dtos/responses/birth-record-list.dto';
import {BirthRecordUsecase} from '../../../../../core/application/use-cases/birth-record.usecase';
import {BirthRecordFilterList} from '../../../../../core/domain/dtos/resquests/birth-record-filter-list';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';
import {Formvalidators} from '../../../../../shared/validators/form-validators';

@Component({
  selector: 'xs-birth-record-view',
  imports: [
    XsPageHeader,
    XsBirthRecordCardDetail,
    XsBirthRecordFilter,
    XsBirthRecordTable,
    XsLoader,
    XsToast
  ],
  templateUrl: './xs-birth-record-view.html',
  styleUrl: './xs-birth-record-view.scss'
})
export class XsBirthRecordView implements OnInit, AfterViewInit {

  @ViewChild('xsLoader') loader!: XsLoader;
  @ViewChild('xsToastRoleView') private toast!: XsToast;

  public birthRecords: BirthRecordListDTO[] = [];
  public totalRecords = 0;
  public recordsThisMonth = 0;
  public maleCount = 0;
  public femaleCount = 0;

  filter: BirthRecordFilterList= {
  };

  constructor(
    private router: Router,
    private birthRecordUseCase: BirthRecordUsecase,
    private util: Formvalidators,
    ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.load();
    });
  }


  load() {
    this.loader.show('Cargando...');

    this.birthRecordUseCase.init(this.filter).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const data = response.data;
          this.birthRecords = data.birthRecords;
          this.totalRecords = data.totalRecords;
          this.recordsThisMonth = data.recordsThisMonth;
          this.maleCount = data.maleCount;
          this.femaleCount = data.femaleCount;
        } else {
          console.warn('No se recibieron datos válidos', response);
        }
        this.loader.hide();
      },
      error: (err) => {
        console.error('Error al cargar partidas', err);
        this.loader.hide();
      }
    });
  }

  onAddItem() {
    this.router.navigate(['/admin/partida_registral/register']);
  }

  onUpdateItem(item: BirthRecordModel) {
    this.router.navigate(['/admin/partida_registral/register', {id: item.id} ]);
  }

  onFilter($event: BirthRecordFilterList) {
    this.filter = $event;
    this.load();
  }

  download(item: BirthRecordModel) {
    this.loader.show('Generando...');
    this.birthRecordUseCase.exportCertificate(item.id!).subscribe({
      next: (blob) => {
        this.util.downloadFile(blob, 'certificate.pdf');
        this.toast.show("Certificado generado con éxito.");
      },
      error: (e) => {
        console.error('Error al generar PDF', e);
        this.toast.show("Error al generar PDF", 'error');
        this.loader.hide();
      },
      complete: () => this.loader.hide()
    });
  }
}
