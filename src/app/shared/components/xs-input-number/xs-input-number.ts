import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'xs-input-number',
  imports: [
    FormsModule,
    InputNumberModule,
    FloatLabel,
    Message,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './xs-input-number.html',
  styleUrl: './xs-input-number.scss'
})
export class XsInputNumber implements OnInit {

  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() size: 'small' | 'large' = 'large';
  @Input() variant: 'over' | 'in' | 'on' = 'on';
  @Input() id: string = '';
  @Input() allowFloatLabel: boolean = true;
  @Input() min: number = 0;
  @Input() max: number = 999999;

  public objectFn = Object;

  @Output() input = new EventEmitter<any>();

  ngOnInit(): void {
    if (!this.id) {
      this.id = `xs-input-${Math.floor(Math.random() * 100000)}`;
    }

    this.control.updateValueAndValidity();
  }

  onInput(event: any): void {
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.input.emit(event);
  }

  onBlur(): void {
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
  }
}
