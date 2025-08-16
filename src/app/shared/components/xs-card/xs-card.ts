import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'xs-card',
  imports: [
    CardModule,
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './xs-card.html',
  styleUrl: './xs-card.scss'
})
export class XsCard {
  @ContentChild('header', { read: TemplateRef }) header!: TemplateRef<unknown>;
  @ContentChild('content', { read: TemplateRef }) content!: TemplateRef<unknown>;
  @ContentChild('footer', { read: TemplateRef }) footer!: TemplateRef<unknown>;

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() styleClass: string = '';
}
