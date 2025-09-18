import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { SelectModule } from 'primeng/select';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Message} from 'primeng/message';
import {FloatLabelModule} from 'primeng/floatlabel';

@Component({
  selector: 'xs-select',
  imports: [
    SelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Message,
    FloatLabelModule
  ],
  templateUrl: './xs-select.html',
  styleUrl: './xs-select.scss'
})
export class XsSelect implements OnInit {
  @Input() control: FormControl = new FormControl;
  @Input() dataSource: any[] = [];
  @Input() optionLabel: string = 'name';
  @Input() optionValue: string = 'parameterId';
  @Input() placeholder: string = '';
  @Input() showClear: boolean = true;
  @Input() filter: boolean = false;
  @Input() filterBy: string = 'nombre';
  @Input() size: 'small' |  'large'  = 'large';
  @Input() variant: 'over' | 'in' | 'on' = 'on';

  @Output() change: EventEmitter<any> = new EventEmitter();

  public objectFn = Object;
  constructor() {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.change.emit({ value: event.value, name: '' });
  }
}
