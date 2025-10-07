import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { XsButton } from "../../../../../shared/components/xs-button/xs-button";
import { XsFieldset } from "../../../../../shared/components/xs-fieldset/xs-fieldset";
import { XsInputText } from "../../../../../shared/components/xs-input-text/xs-input-text";
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import {XsFilterButtons} from '../../../../../shared/components/xs-filter-buttons/xs-filter-buttons';
import {XsSelect} from '../../../../../shared/components/xs-select/xs-select';
import {RoleViewRequest} from '../../../../../core/domain/dtos/resquests/role-view.request';

@Component({
  selector: 'xs-role-filter',
  imports: [
    XsFieldset,
    XsInputText,
    XsFilterButtons,
    XsSelect
  ],
  templateUrl: './xs-role-filter.html',
  styleUrls: ['./xs-role-filter.scss']
})
export class XsRoleFilter implements OnInit {
  @Output() filter: EventEmitter<RoleViewRequest> = new EventEmitter();
  @Output() clear: EventEmitter<RoleViewRequest> = new EventEmitter();

  public formulario!: FormGroup;

  public statusOptions = [
    { label: 'Habilitado', value: true, active: true },
    { label: 'Inhabilitado', value: false, active: true }
  ];

  get name(): AbstractControl | null { return this.formulario.get('name'); }
  get description(): AbstractControl | null { return this.formulario.get('description'); }
  get status(): AbstractControl | null { return this.formulario.get('status'); }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.configForm();
  }

  private configForm(): void {
    this.formulario = this.formBuilder.group({
      name: [null],
      description: [null],
      status: [null]
    });
  }

  onClickFilter(): void {
    const request: RoleViewRequest = {
      name: this.name?.value || '',
      description: this.description?.value || '',
      status: this.status?.value !== null ? this.status?.value : undefined,
      page: 0,
      size: 5
    };

    this.filter.emit(request);
  }

  onClickClear(): void {
    this.formulario.reset();

    const request: RoleViewRequest = {
      name:  '',
      description: '',
      status: undefined,
      page: 0,
      size: 5
    };

    this.clear.emit(request);
  }
}
