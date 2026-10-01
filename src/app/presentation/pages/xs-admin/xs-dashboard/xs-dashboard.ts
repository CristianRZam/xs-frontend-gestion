import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { finalize } from 'rxjs';
import { DashboardUseCase } from '../../../../core/application/use-cases/dashboard.usecase';
import { DashboardResponse } from '../../../../core/domain/dtos/responses/dashboard.response';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { XsLoader } from '../../../../shared/components/xs-loader/xs-loader';
import { XsToast } from '../../../../shared/components/xs-toast/xs-toast';
import { XsButton } from '../../../../shared/components/xs-button/xs-button';
import { XsChart } from '../../../../shared/components/xs-chart/xs-chart';
import { XsDashboardMetricCard } from '../../../../shared/components/xs-dashboard-metric-card/xs-dashboard-metric-card';

@Component({
  selector: 'xs-dashboard',
  imports: [CurrencyPipe, DatePipe, XsLoader, XsToast, XsButton, XsChart, XsDashboardMetricCard],
  templateUrl: './xs-dashboard.html',
  styleUrl: './xs-dashboard.scss'
})
export class XsDashboard implements AfterViewInit {
  @ViewChild('dashboardLoader') private loader!: XsLoader;
  @ViewChild('dashboardToast') private toast!: XsToast;

  public dashboard?: DashboardResponse;
  public weeklySalesData: ChartData<'line'> = { labels: [], datasets: [] };
  public topProductsData: ChartData<'bar'> = { labels: [], datasets: [] };
  public paymentMethodsData: ChartData<'doughnut'> = { labels: [], datasets: [] };

  public readonly lineOptions: ChartOptions<'line'> = {
    responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { callback: value => `S/ ${value}` } }, x: { grid: { display: false } } }
  };
  public readonly barOptions: ChartOptions<'bar'> = {
    indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
    scales: { x: { beginAtZero: true, ticks: { precision: 0 } }, y: { grid: { display: false } } }
  };
  public readonly doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }
  };

  constructor(private readonly dashboardUseCase: DashboardUseCase, private readonly errorHandler: ErrorHandlerService) {}

  ngAfterViewInit(): void { setTimeout(() => this.load()); }

  load(): void {
    this.loader.show('Cargando dashboard...');
    this.dashboardUseCase.getSummary().pipe(
      finalize(() => this.loader.hide())
    ).subscribe({
      next: response => {
        if (response.success && response.data) {
          this.dashboard = response.data;
          this.setCharts(response.data);
        } else {
          this.toast.show(response.message || 'No se pudo cargar el dashboard.', 'error');
        }
      },
      error: error => this.toast.show(this.errorHandler.getErrorMessage(error, 'cargar', 'dashboard'), 'error')
    });
  }

  private setCharts(data: DashboardResponse): void {
    this.weeklySalesData = {
      labels: data.weeklySales.map(item => this.formatWeekday(item.date)),
      datasets: [{ data: data.weeklySales.map(item => Number(item.total)), borderColor: '#6366f1', backgroundColor: 'rgba(99, 102, 241, 0.12)', fill: true, tension: 0.35, pointBackgroundColor: '#6366f1' }]
    };
    this.topProductsData = {
      labels: data.topProducts.map(item => item.productName),
      datasets: [{ data: data.topProducts.map(item => Number(item.quantity)), backgroundColor: '#14b8a6', borderRadius: 6, barThickness: 20 }]
    };
    this.paymentMethodsData = {
      labels: data.paymentMethods.map(item => item.method),
      datasets: [{ data: data.paymentMethods.map(item => Number(item.total)), backgroundColor: ['#6366f1', '#14b8a6', '#f59e0b', '#ec4899', '#0ea5e9'], borderWidth: 0 }]
    };
  }

  private formatWeekday(date: string): string {
    return new Intl.DateTimeFormat('es-PE', { weekday: 'short' }).format(new Date(`${date}T00:00:00`)).replace('.', '');
  }
}
