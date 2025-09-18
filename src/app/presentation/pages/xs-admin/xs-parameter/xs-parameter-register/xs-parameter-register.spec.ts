import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsParameterRegister } from './xs-parameter-register';

describe('XsParameterRegister', () => {
  let component: XsParameterRegister;
  let fixture: ComponentFixture<XsParameterRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsParameterRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsParameterRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
