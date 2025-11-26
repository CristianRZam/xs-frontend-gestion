import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsBirthRecordFilter } from './xs-birth-record-filter';

describe('XsBirthRecordFilter', () => {
  let component: XsBirthRecordFilter;
  let fixture: ComponentFixture<XsBirthRecordFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsBirthRecordFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsBirthRecordFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
