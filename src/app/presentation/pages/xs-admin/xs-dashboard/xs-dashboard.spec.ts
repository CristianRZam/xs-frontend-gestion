import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsDashboard } from './xs-dashboard';

describe('XsDashboard', () => {
  let component: XsDashboard;
  let fixture: ComponentFixture<XsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsDashboard]
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
