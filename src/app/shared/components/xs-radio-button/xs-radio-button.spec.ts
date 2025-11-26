import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsRadioButton } from './xs-radio-button';

describe('XsRadioButton', () => {
  let component: XsRadioButton;
  let fixture: ComponentFixture<XsRadioButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsRadioButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsRadioButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
