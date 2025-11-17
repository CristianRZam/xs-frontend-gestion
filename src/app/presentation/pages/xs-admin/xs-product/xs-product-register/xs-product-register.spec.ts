import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsProductRegister } from './xs-product-register';

describe('XsProductRegister', () => {
  let component: XsProductRegister;
  let fixture: ComponentFixture<XsProductRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsProductRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsProductRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
