import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'xs-input-text',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    MessageModule
  ],
  templateUrl: './xs-input-text.html',
  styleUrl: './xs-input-text.scss'
})
export class XsInputText implements OnInit {
 @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'password' | 'number' | 'date' | 'mask' = 'text';
  @Input() size: 'small' |  'large'  = 'large';
  @Input() variant: 'over' | 'in' | 'on' = 'on';
  @Input() minLength: number = 0;
  @Input() maxLength: number = 255;
  @Input() id: string = '';
  @Input() allowFloatLabel: boolean = true;
  public objectFn = Object;

  @Output() input = new EventEmitter<any>();


  ngOnInit(): void {
    if (!this.id) this.id = `xs-input-${Math.floor(Math.random() * 100000)}`;
    this.control.updateValueAndValidity();
  }

  onInput(event: any): void {
    this.input.emit(event);
  }
}
