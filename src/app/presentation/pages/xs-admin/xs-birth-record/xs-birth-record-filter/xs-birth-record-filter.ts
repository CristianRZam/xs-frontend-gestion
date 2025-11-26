import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { XsFieldset } from "../../../../../shared/components/xs-fieldset/xs-fieldset";
import { XsFilterButtons } from "../../../../../shared/components/xs-filter-buttons/xs-filter-buttons";
import { XsInputText } from "../../../../../shared/components/xs-input-text/xs-input-text";
import { XsSelect } from "../../../../../shared/components/xs-select/xs-select";
import {BirthRecordFilterList} from '../../../../../core/domain/dtos/resquests/birth-record-filter-list';

@Component({
  selector: 'xs-birth-record-filter',
  imports: [
    XsFieldset,
    XsFilterButtons,
    XsInputText,
    XsSelect
  ],
  templateUrl: './xs-birth-record-filter.html',
  styleUrl: './xs-birth-record-filter.scss'
})
export class XsBirthRecordFilter implements OnInit {

  @Output() filter: EventEmitter<BirthRecordFilterList> = new EventEmitter();
  public formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.configForm();
  }

  private configForm(): void {
    this.formulario = this.formBuilder.group({
      year: [null],
      actNumber: [null],

      personName: [null],
      sex: [null],

      fatherName: [null],
      motherName: [null],

      birthDateFrom: [null],
      birthDateTo: [null],

      recordDateFrom: [null],
      recordDateTo: [null],
    });
  }

  onClickFilter(): void {
    const request: BirthRecordFilterList = {
      ...this.formulario.value
    };
    this.filter.emit(request);
  }

  onClickClear(): void {
    this.formulario.reset();
    this.filter.emit({});
  }
}
