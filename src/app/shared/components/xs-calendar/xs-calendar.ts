import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'xs-calendar',
  imports: [CommonModule, ReactiveFormsModule, DatePickerModule, FloatLabelModule, MessageModule],
  templateUrl: './xs-calendar.html',
  styleUrl: './xs-calendar.scss'
})
export class XsCalendar implements OnInit {
  @Input() control: FormControl<Date | null> = new FormControl<Date | null>(null);
  @Input() placeholder = '';
  @Input() id = '';
  @Input() dateFormat = 'dd/mm/yy';
  @Input() showIcon = true;
  @Input() showClear = true;
  @Input() readonlyInput = true;
  @Input() size: 'small' | 'large' = 'large';

  ngOnInit(): void {
    if (!this.id) this.id = `xs-calendar-${Math.floor(Math.random() * 100000)}`;
    this.control.updateValueAndValidity();
  }
}
