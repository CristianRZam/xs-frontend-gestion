import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsBirthRecordRegister } from './xs-birth-record-register';

describe('XsBirthRecordRegister', () => {
  let component: XsBirthRecordRegister;
  let fixture: ComponentFixture<XsBirthRecordRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsBirthRecordRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsBirthRecordRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
