import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsLoginCarousel } from './xs-login-carousel';

describe('XsLoginCarousel', () => {
  let component: XsLoginCarousel;
  let fixture: ComponentFixture<XsLoginCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsLoginCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsLoginCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
