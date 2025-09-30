import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsProfileRegister } from './xs-profile-register';

describe('XsProfileRegister', () => {
  let component: XsProfileRegister;
  let fixture: ComponentFixture<XsProfileRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsProfileRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsProfileRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
