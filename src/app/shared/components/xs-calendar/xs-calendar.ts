import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DatePicker} from 'primeng/datepicker';
import {Message} from 'primeng/message';
import {NgClass} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'xs-calendar',
  imports: [
    DatePicker,
    Message,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './xs-calendar.html',
  styleUrl: './xs-calendar.scss'
})
export class XsCalendar implements OnInit, OnChanges {

  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() placeholder: string = 'dd/mm/aaaa';
  @Input() id: string = '';
  @Input() disabled: boolean = false;
  @Input() showIcon: boolean = true;
  @Input() dateFormat: string = 'dd/mm/yy';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() showTime: boolean = true;

  @Output() valueChange = new EventEmitter<Date>();

  public objectFn = Object;

  ngOnInit(): void {
    if (!this.id) {
      this.id = `xcc-calendar-${Math.random().toString(36).substring(2, 9)}`;
    }
    this.syncDisabledState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.syncDisabledState();
    }
  }

  private syncDisabledState(): void {
    this.disabled
      ? this.control.disable({ emitEvent: false })
      : this.control.enable({ emitEvent: false });
  }

  onSelect(event: Date): void {
    this.valueChange.emit(event);
  }
}
