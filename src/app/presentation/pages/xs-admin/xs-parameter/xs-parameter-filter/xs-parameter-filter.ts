import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {XsFieldset} from '../../../../../shared/components/xs-fieldset/xs-fieldset';
import {XsInputText} from '../../../../../shared/components/xs-input-text/xs-input-text';
import {XsFilterButtons} from '../../../../../shared/components/xs-filter-buttons/xs-filter-buttons';
import {XsSelect} from '../../../../../shared/components/xs-select/xs-select';
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';
import {ParameterViewRequest} from '../../../../../core/domain/dtos/resquests/parameter-view.request';
import {UserViewRequest} from '../../../../../core/domain/dtos/resquests/user-view.request';

@Component({
  selector: 'xs-parameter-filter',
  imports: [
    XsFieldset,
    XsInputText,
    XsSelect,
    XsFilterButtons
  ],
  templateUrl: './xs-parameter-filter.html',
  styleUrl: './xs-parameter-filter.scss'
})
export class XsParameterFilter implements OnInit {
  @Output() filter: EventEmitter<ParameterViewRequest> = new EventEmitter();

  public formulario!: FormGroup;
  @Input() typesParameter!: ParameterModel[];

  public statusOptions = [
    { label: 'Habilitado', value: true, active: true },
    { label: 'Inhabilitado', value: false, active: true }
  ];

  get name(): AbstractControl | null { return this.formulario.get('name'); }
  get shortName(): AbstractControl | null { return this.formulario.get('shortName'); }
  get code(): AbstractControl | null { return this.formulario.get('code'); }
  get type(): AbstractControl | null { return this.formulario.get('type'); }
  get status(): AbstractControl | null { return this.formulario.get('status'); }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.configForm();
  }

  private configForm(): void {
    this.formulario = this.formBuilder.group({
      name: [null],
      shortName: [null],
      code: [null],
      type: [null],
      status: [null]
    });
  }

  onClickFilter(): void {
    const request: ParameterViewRequest = {
      name: this.name?.value || '',
      shortName: this.shortName?.value || '',
      code: this.code?.value || '',
      type: this.type?.value || '',
      status: this.status?.value !== null ? this.status?.value : undefined,
      page: 0,
      size: 5
    };

    this.filter.emit(request);
  }

  onClickClear(): void {
    this.formulario.reset();

    const request: ParameterViewRequest = {
      page: 0,
      size: 5
    };

    this.filter.emit(request);
  }
}
