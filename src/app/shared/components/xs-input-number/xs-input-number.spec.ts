import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsInputNumber } from './xs-input-number';

describe('XsInputNumber', () => {
  let component: XsInputNumber;
  let fixture: ComponentFixture<XsInputNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsInputNumber]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsInputNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
