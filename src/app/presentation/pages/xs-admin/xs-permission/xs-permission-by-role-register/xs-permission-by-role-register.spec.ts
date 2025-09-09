import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsPermissionByRoleRegister } from './xs-permission-by-role-register';

describe('XsPermissionByRoleRegister', () => {
  let component: XsPermissionByRoleRegister;
  let fixture: ComponentFixture<XsPermissionByRoleRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsPermissionByRoleRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsPermissionByRoleRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
