import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { XsFieldset } from "../../../../../shared/components/xs-fieldset/xs-fieldset";
import { XsInputText } from "../../../../../shared/components/xs-input-text/xs-input-text";
import { XsFilterButtons } from '../../../../../shared/components/xs-filter-buttons/xs-filter-buttons';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { XsMultiselect } from '../../../../../shared/components/xs-multiselect/xs-multiselect';
import { XsSelect } from '../../../../../shared/components/xs-select/xs-select';
import {UserViewRequest} from '../../../../../core/domain/dtos/resquests/user-view.request';
import {UserModel} from '../../../../../core/domain/models/user.model';
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';

@Component({
  selector: 'xs-user-filter',
  standalone: true,
  imports: [
    XsFieldset,
    XsInputText,
    XsFilterButtons,
    XsMultiselect,
    XsSelect
  ],
  templateUrl: './xs-user-filter.html',
  styleUrl: './xs-user-filter.scss'
})
export class XsUserFilter implements OnInit {
  @Output() filter: EventEmitter<UserViewRequest> = new EventEmitter<UserViewRequest>();
  @Output() clear: EventEmitter<UserViewRequest> = new EventEmitter<UserViewRequest>();

  @Input() typeDocumentsData: ParameterModel [] = [];

  public formulario!: FormGroup;

  public statusOptions = [
    { label: 'Habilitado', value: true, active: true },
    { label: 'Inhabilitado', value: false, active: true }
  ];

  get typeDocuments(): AbstractControl | null { return this.formulario.get('typeDocuments'); }
  get document(): AbstractControl | null { return this.formulario.get('document'); }
  get fullName(): AbstractControl | null { return this.formulario.get('fullName'); }
  get username(): AbstractControl | null { return this.formulario.get('username'); }
  get email(): AbstractControl | null { return this.formulario.get('email'); }
  get status(): AbstractControl | null { return this.formulario.get('status'); }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.configForm();
  }

  private configForm(): void {
    this.formulario = this.formBuilder.group({
      typeDocuments: [null],
      document: [null],
      fullName: [null],
      username: [null],
      email: [null],
      status: [null],
    });
  }

  onClickFilter(): void {

    const request: UserViewRequest = {
      typeDocuments: this.typeDocuments?.value || [],
      document: this.document?.value || '',
      fullName: this.fullName?.value || '',
      username: this.username?.value || '',
      email: this.email?.value || '',
      status: this.status?.value !== null ? this.status?.value : undefined,
      page: 0,
      size: 5
    };

    this.filter.emit(request);
  }

  onClickClear(): void {
    this.formulario.reset();

    const request: UserViewRequest = {
      typeDocuments: [],
      document: '',
      fullName: '',
      username: '',
      email: '',
      status: undefined,
      page: 0,
      size: 5
    };

    this.filter.emit(request);
  }

}
