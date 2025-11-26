import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsBirthRecordTable } from './xs-birth-record-table';

describe('XsBirthRecordTable', () => {
  let component: XsBirthRecordTable;
  let fixture: ComponentFixture<XsBirthRecordTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsBirthRecordTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsBirthRecordTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
