import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsFieldset } from './xs-fieldset';

describe('XsFieldset', () => {
  let component: XsFieldset;
  let fixture: ComponentFixture<XsFieldset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsFieldset]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsFieldset);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
