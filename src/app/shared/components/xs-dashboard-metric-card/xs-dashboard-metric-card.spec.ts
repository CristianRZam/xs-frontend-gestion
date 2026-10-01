import { ComponentFixture, TestBed } from '@angular/core/testing';
import { XsDashboardMetricCard } from './xs-dashboard-metric-card';

describe('XsDashboardMetricCard', () => {
  let component: XsDashboardMetricCard;
  let fixture: ComponentFixture<XsDashboardMetricCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [XsDashboardMetricCard] }).compileComponents();
    fixture = TestBed.createComponent(XsDashboardMetricCard);
    component = fixture.componentInstance;
    component.title = 'Ventas';
    component.value = 'S/ 100.00';
    component.icon = 'fa-solid fa-wallet';
    fixture.detectChanges();
  });

  it('should display the configured metric', () => {
    expect(fixture.nativeElement.textContent).toContain('Ventas');
    expect(fixture.nativeElement.textContent).toContain('S/ 100.00');
  });
});
