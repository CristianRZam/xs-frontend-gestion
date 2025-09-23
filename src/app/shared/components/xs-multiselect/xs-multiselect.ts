import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import {CommonModule} from '@angular/common';
import {FloatLabelModule} from 'primeng/floatlabel';
import {Message} from 'primeng/message';

@Component({
  selector: 'xs-multiselect',
  imports: [
    MultiSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    Message
  ],
  templateUrl: './xs-multiselect.html',
  styleUrl: './xs-multiselect.scss'
})
export class XsMultiselect implements OnInit {

  @Input() control: FormControl = new FormControl;
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() allowFloatLabel: boolean = true;
  @Input() esDisable: boolean = false;
  @Input() dataSource: any = [];
  @Input() optionLabel: string = 'nombre';
  @Input() optionValue: string = 'idParametro';
  @Input() displayMode: string = 'chip';
  @Input() showClear: boolean = true;
  @Input() filter: boolean = true;
  @Input() esRequerido: boolean = true;
  @Input() styleClass: string = '';
  @Input() maxSelectedLabels: number = 2;
  @Input() variant: 'over' | 'in' | 'on' = 'on';
  @Input() size: 'small' |  'large'  = 'large';
  @Output() change: EventEmitter<any> = new EventEmitter();
  public objectFn = Object;

  constructor() { }

  ngOnInit(): void {
  }

  onChange() {
    this.change.emit();
  }
}
