import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsRoleRegister } from './xs-role-register';

describe('XsRoleRegister', () => {
  let component: XsRoleRegister;
  let fixture: ComponentFixture<XsRoleRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsRoleRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsRoleRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
