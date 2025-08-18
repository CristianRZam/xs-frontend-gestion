import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsToast } from './xs-toast';

describe('XsToast', () => {
  let component: XsToast;
  let fixture: ComponentFixture<XsToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsToast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsToast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
