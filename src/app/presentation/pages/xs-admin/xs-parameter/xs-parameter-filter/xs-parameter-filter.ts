import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {XsFieldset} from '../../../../../shared/components/xs-fieldset/xs-fieldset';
import {XsInputText} from '../../../../../shared/components/xs-input-text/xs-input-text';
import {XsFilterButtons} from '../../../../../shared/components/xs-filter-buttons/xs-filter-buttons';
import {XsSelect} from '../../../../../shared/components/xs-select/xs-select';
import {ParameterModel} from '../../../../../core/domain/models/parameter.model';

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
  @Output() filter: EventEmitter<{
    name: string,
    shortName: string,
    code: string,
    type: number | null
  }> = new EventEmitter();

  @Output() clear: EventEmitter<{}> = new EventEmitter();

  public formulario!: FormGroup;
  public types: ParameterModel[] =[];

  get name(): AbstractControl | null { return this.formulario.get('name'); }
  get shortName(): AbstractControl | null { return this.formulario.get('shortName'); }
  get code(): AbstractControl | null { return this.formulario.get('code'); }
  get type(): AbstractControl | null { return this.formulario.get('type'); }

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
    });
  }

  onClickFilter(): void {
    this.filter.emit({
      name: this.name?.value ?? '',
      shortName: this.shortName?.value ?? '',
      code: this.code?.value ?? '',
      type: this.type?.value ?? null,
    });
  }

  onClickClear(): void {
    this.formulario.reset();
    this.clear.emit();
  }
}
