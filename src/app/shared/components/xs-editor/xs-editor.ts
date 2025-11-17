import {Component, Input, OnInit} from '@angular/core';
import {EditorModule} from 'primeng/editor';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Message} from 'primeng/message';

@Component({
  selector: 'xs-editor',
  imports: [
    EditorModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Message,
  ],
  templateUrl: './xs-editor.html',
  styleUrl: './xs-editor.scss'
})
export class XsEditor implements OnInit {
  @Input() control: FormControl = new FormControl;
  @Input() placeholder: string = '';
  @Input() helperText: string = '';
  @Input() helper: boolean = false;
  @Input() icon: string = '';
  @Input() autocomplete: boolean = false;
  @Input() allowFloatLabel: boolean = true;
  @Input() esRequerido: boolean = true;
  @Input() disabled: boolean = true;
  @Input() maxLength: number = 4000;
  public objectFn = Object;

  constructor() { }

  ngOnInit(): void {
  }
}
