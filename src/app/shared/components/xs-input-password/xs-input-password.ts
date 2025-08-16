import { Component, Input } from '@angular/core';
import {Password } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'xs-input-password',
  imports: [Password, FloatLabelModule, FormsModule, ReactiveFormsModule, CommonModule, MessageModule],
  templateUrl: './xs-input-password.html',
  styleUrl: './xs-input-password.scss'
})
export class XsInputPassword {
  @Input() inputId: string = '';
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() toggleTask: boolean = true;
  @Input() feedback: boolean = false;
  @Input() size: 'small' |  'large'  = 'large';
  @Input() variant: 'over' | 'in' | 'on' = 'on';
  @Input() allowFloatLabel: boolean = true;
  public objectFn = Object;
}
