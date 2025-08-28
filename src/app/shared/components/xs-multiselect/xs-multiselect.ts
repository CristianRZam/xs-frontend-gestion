import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'xs-multiselect',
  imports: [],
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
  @Input() esRequerido: boolean = true;
  @Input() styleClass: string = '';
  @Input() maxSelectedLabels: number = 2;
  @Output() change: EventEmitter<any> = new EventEmitter();
  public objectFn = Object;

  constructor() { }

  ngOnInit(): void {
  }

  onChange() {
    this.change.emit();
  }
}
