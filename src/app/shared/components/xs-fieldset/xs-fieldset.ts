import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'xs-fieldset',
  imports: [
    FieldsetModule,
    CommonModule
  ],
  templateUrl: './xs-fieldset.html',
  styleUrl: './xs-fieldset.scss'
})
export class XsFieldset {
  @ContentChild('content', { read: TemplateRef }) content!: TemplateRef<unknown>;

  @Input() legend: string = '';
  @Input() toggleable: boolean = true;
}
