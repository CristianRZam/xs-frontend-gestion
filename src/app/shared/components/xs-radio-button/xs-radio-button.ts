import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RadioButton} from 'primeng/radiobutton';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'xs-radio-button',
  imports: [
    RadioButton,
    ReactiveFormsModule
  ],
  templateUrl: './xs-radio-button.html',
  styleUrl: './xs-radio-button.scss'
})
export class XsRadioButton implements OnInit {

  @Input() control: FormControl = new FormControl;
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() label: string = '';
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.change.emit(event);
  }

}
