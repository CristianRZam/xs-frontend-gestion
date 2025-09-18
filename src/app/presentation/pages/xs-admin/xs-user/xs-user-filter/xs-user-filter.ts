import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { XsFieldset } from "../../../../../shared/components/xs-fieldset/xs-fieldset";
import { XsInputText } from "../../../../../shared/components/xs-input-text/xs-input-text";
import { XsButton } from "../../../../../shared/components/xs-button/xs-button";
import {XsFilterButtons} from '../../../../../shared/components/xs-filter-buttons/xs-filter-buttons';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'xs-user-filter',
  imports: [
    XsFieldset,
    XsInputText,
    XsFilterButtons
  ],
  templateUrl: './xs-user-filter.html',
  styleUrl: './xs-user-filter.scss'
})
export class XsUserFilter implements OnInit {
  @Output() filter: EventEmitter<{ name: string }> = new EventEmitter();
  @Output() clear: EventEmitter<{}> = new EventEmitter();

  public formulario!: FormGroup;

  get name(): AbstractControl | null { return this.formulario.get('name'); }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.configForm();
  }

  private configForm(): void {
    this.formulario = this.formBuilder.group({
      name: [null],
    });
  }

  onClickFilter(): void {
    this.filter.emit({
      name: this.name?.value ? this.name.value : '',
    });
  }

  onClickClear(): void {
    this.name?.setValue(null);
    this.clear.emit();
  }
}
