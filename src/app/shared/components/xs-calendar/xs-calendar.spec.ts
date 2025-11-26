import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsCalendar } from './xs-calendar';

describe('XsCalendar', () => {
  let component: XsCalendar;
  let fixture: ComponentFixture<XsCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
