import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsPortalHost } from './xs-portal-host';

describe('XsPortalHost', () => {
  let component: XsPortalHost;
  let fixture: ComponentFixture<XsPortalHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsPortalHost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsPortalHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
