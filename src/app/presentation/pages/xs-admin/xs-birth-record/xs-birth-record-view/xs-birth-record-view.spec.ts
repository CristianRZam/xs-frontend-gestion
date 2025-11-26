import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsBirthRecordView } from './xs-birth-record-view';

describe('XsBirthRecordView', () => {
  let component: XsBirthRecordView;
  let fixture: ComponentFixture<XsBirthRecordView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsBirthRecordView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsBirthRecordView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
