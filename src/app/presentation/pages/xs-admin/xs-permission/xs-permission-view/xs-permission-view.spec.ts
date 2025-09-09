import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsPermissionView } from './xs-permission-view';

describe('XsPermissionView', () => {
  let component: XsPermissionView;
  let fixture: ComponentFixture<XsPermissionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsPermissionView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsPermissionView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
