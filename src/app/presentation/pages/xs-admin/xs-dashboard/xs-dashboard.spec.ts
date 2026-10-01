import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { XsDashboard } from './xs-dashboard';
import { DashboardUseCase } from '../../../../core/application/use-cases/dashboard.usecase';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';

describe('XsDashboard', () => {
  let component: XsDashboard;
  let fixture: ComponentFixture<XsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsDashboard],
      providers: [
        {
          provide: DashboardUseCase,
          useValue: {
            getSummary: () => of({
              status: 200,
              success: true,
              message: 'Dashboard obtenido correctamente',
              data: {
                scope: 'GLOBAL',
                summaryDate: '2026-09-29',
                todaySalesCount: 0,
                averageSale: 0,
                todaySales: 0,
                todayOrders: 0,
                weeklySales: [],
                topProducts: [],
                paymentMethods: []
              }
            })
          }
        },
        { provide: ErrorHandlerService, useValue: { getErrorMessage: () => 'Error' } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
