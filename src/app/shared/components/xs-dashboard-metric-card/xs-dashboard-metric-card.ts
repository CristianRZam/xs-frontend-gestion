import { Component, Input } from '@angular/core';

@Component({
  selector: 'xs-dashboard-metric-card',
  imports: [],
  templateUrl: './xs-dashboard-metric-card.html',
  styleUrl: './xs-dashboard-metric-card.scss'
})
export class XsDashboardMetricCard {
  @Input({ required: true }) title = '';
  @Input({ required: true }) value: string | null = '';
  @Input({ required: true }) icon = '';
  @Input() description = '';
  @Input() tone: 'primary' | 'success' | 'warning' | 'info' = 'primary';
}
