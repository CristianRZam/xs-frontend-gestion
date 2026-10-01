import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'xs-chart',
  imports: [],
  templateUrl: './xs-chart.html',
  styleUrl: './xs-chart.scss'
})
export class XsChart implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('canvas') private canvas?: ElementRef<HTMLCanvasElement>;

  @Input({ required: true }) type: ChartType = 'bar';
  @Input({ required: true }) data: ChartData = { labels: [], datasets: [] };
  @Input() options: ChartOptions = {};
  @Input() ariaLabel = 'Gráfico del dashboard';

  private chart?: Chart;

  ngAfterViewInit(): void { this.render(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.canvas && (changes['type'] || changes['data'] || changes['options'])) this.render();
  }

  ngOnDestroy(): void { this.chart?.destroy(); }

  private render(): void {
    if (!this.canvas) return;

    this.chart?.destroy();
    this.chart = new Chart(this.canvas.nativeElement, {
      type: this.type,
      data: this.data,
      options: this.options
    } as ChartConfiguration);
  }
}
