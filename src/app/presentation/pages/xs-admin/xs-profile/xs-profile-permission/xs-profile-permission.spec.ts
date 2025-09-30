import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsProfilePermission } from './xs-profile-permission';

describe('XsProfilePermission', () => {
  let component: XsProfilePermission;
  let fixture: ComponentFixture<XsProfilePermission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsProfilePermission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsProfilePermission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
