import {Component, Input, OnInit} from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Message} from 'primeng/message';

@Component({
  selector: 'xs-text-area',
  imports: [
    TextareaModule,
    FloatLabel,
    CommonModule,
    ReactiveFormsModule,
    Message,
  ],
  templateUrl: './xs-text-area.html',
  styleUrl: './xs-text-area.scss'
})
export class XsTextArea implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() size: 'small' |  'large'  = 'large';
  @Input() variant: 'over' | 'in' | 'on' = 'on';
  @Input() rows: number = 3;
  @Input() cols: number = 30;
  @Input() autoResize: boolean = true;
  @Input() id: string = '';
  @Input() allowFloatLabel: boolean = true;
  public objectFn = Object;
  ngOnInit(): void {
    if (!this.id) this.id = `xs-text-area-${Math.floor(Math.random() * 100000)}`;
    this.control.updateValueAndValidity();
  }

}
