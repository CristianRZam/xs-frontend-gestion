import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsAdminHost } from './xs-admin-host';

describe('XsAdminHost', () => {
  let component: XsAdminHost;
  let fixture: ComponentFixture<XsAdminHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsAdminHost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsAdminHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
