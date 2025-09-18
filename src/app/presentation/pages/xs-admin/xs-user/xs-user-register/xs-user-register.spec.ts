import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsUserRegister } from './xs-user-register';

describe('XsUserRegister', () => {
  let component: XsUserRegister;
  let fixture: ComponentFixture<XsUserRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsUserRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsUserRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
