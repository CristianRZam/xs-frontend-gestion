import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {XsPageHeader} from '../../../../../shared/components/xs-page-header/xs-page-header';
import {XsSelect} from '../../../../../shared/components/xs-select/xs-select';
import {XsInputText} from '../../../../../shared/components/xs-input-text/xs-input-text';
import {XsRadioButton} from '../../../../../shared/components/xs-radio-button/xs-radio-button';
import {XsCalendar} from '../../../../../shared/components/xs-calendar/xs-calendar';
import {XsButton} from '../../../../../shared/components/xs-button/xs-button';
import {BirthRecordUsecase} from '../../../../../core/application/use-cases/birth-record.usecase';
import {Formvalidators} from '../../../../../shared/validators/form-validators';
import {FormRegisterConfig} from './form-register-config';
import {XsLoader} from '../../../../../shared/components/xs-loader/xs-loader';
import {BirthRecordRequest} from '../../../../../core/domain/dtos/resquests/birth-record.request';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';

@Component({
  selector: 'xs-birth-record-register',
  imports: [
    ReactiveFormsModule,
    XsPageHeader,
    XsSelect,
    XsInputText,
    XsRadioButton,
    XsCalendar,
    XsButton,
    XsLoader,
    XsToast
  ],
  templateUrl: './xs-birth-record-register.html',
  styleUrl: './xs-birth-record-register.scss'
})
export class XsBirthRecordRegister implements OnInit {

  @ViewChild('xsLoader') loader!: XsLoader;
  @ViewChild('xsToastRoleView') private toast!: XsToast;

  districtOptions = [
    { label: 'Pira', value: 1 , active: true },
  ];

  canDownload = false;
  id!: number;

  constructor(
    public formConfig: FormRegisterConfig,
    private router: Router,
    private route: ActivatedRoute,
    private service: BirthRecordUsecase,
    private util: Formvalidators,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.formConfig.configForm();

    this.formConfig.formulario.reset();

    this.formConfig.formulario.patchValue({
      districtId: 1,
      districtName: 'Pira',
      districtProvince: 'Huaraz',
      districtDepartment: 'Ancash',
      birthPlaceDetail: 'Pira - Huaraz - Ancash'
    });

    if (this.id) {
      this.loadData();
    } else {
      const currentYear = new Date().getFullYear();

      // Generar número de acta aleatorio: 4 dígitos
      const temporaryActNumber = this.generateActNumber();

      this.formConfig.formulario.patchValue({
        year: currentYear,
        actNumber: temporaryActNumber
      });
    }

  }

  generateActNumber(): string {
    // Aleatorio entre 1000 y 9999
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return randomNum.toString();
  }

  loadData() {
    this.service.initForm(this.id).subscribe(res => {
      const detail = res.data?.birthRecordDetail;
      if (!detail) return;
      if (detail.birthDatetime) {
        detail.birthDatetime = new Date(detail.birthDatetime);
      }
      if (detail.recordDatetime) {
        detail.recordDatetime = new Date(detail.recordDatetime);
      }
      this.formConfig.formulario.patchValue(detail);

      this.canDownload = true;
    });
  }


  onCancel() {
    this.router.navigate(['/admin/partida_registral']);
  }

  onSubmit() {
    const result = this.util.formSubmitEvent(this.formConfig.formulario);

    if (result.error) {
      console.warn("Formulario inválido:", result.mensaje);
      return;
    }

    const payload = this.formConfig.assignModel();

    if (this.id) {
      this.update(payload);
    } else {
      this.create(payload);
    }
  }

  create(request: BirthRecordRequest) {
    this.loader.show();
    this.service.create(request).subscribe({
      next: (res) => {
        console.log('Registro creado:', res.data);
        // Asignar id del registro recién creado
        this.id = res.data?.id;
        this.formConfig.formulario.patchValue({ id: this.id });
        this.loader.hide();
        this.toast.show("Operación exitosa.");
      },
      error: (err) => {
        console.error('Error creando registro:', err);
        this.loader.hide();
      }
    });
  }

  update(request: BirthRecordRequest) {
    this.loader.show();
    this.service.update(request).subscribe({
      next: (res) => {
        console.log('Registro actualizado:', res.data);
        // Actualizamos el id por si el backend retorna un nuevo id
        this.id = res.data?.id;
        this.formConfig.formulario.patchValue({ id: this.id });
        this.loader.hide();
        this.toast.show("Operación exitosa.");
      },
      error: (err) => {
        console.error('Error actualizando registro:', err);
        this.loader.hide();
      }
    });
  }

  onDownload() {
    this.loader.show('Generando...');
    this.service.exportCertificate(this.id).subscribe({
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
