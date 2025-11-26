import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsBirthRecordCardDetail } from './xs-birth-record-card-detail';

describe('XsBirthRecordCardDetail', () => {
  let component: XsBirthRecordCardDetail;
  let fixture: ComponentFixture<XsBirthRecordCardDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsBirthRecordCardDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsBirthRecordCardDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
