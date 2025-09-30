import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsProfileDetail } from './xs-profile-detail';

describe('XsProfileDetail', () => {
  let component: XsProfileDetail;
  let fixture: ComponentFixture<XsProfileDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsProfileDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsProfileDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
