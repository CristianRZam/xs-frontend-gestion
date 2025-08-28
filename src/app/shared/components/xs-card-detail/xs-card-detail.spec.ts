import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsCardDetail } from './xs-card-detail';

describe('XsCardDetail', () => {
  let component: XsCardDetail;
  let fixture: ComponentFixture<XsCardDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsCardDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsCardDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
