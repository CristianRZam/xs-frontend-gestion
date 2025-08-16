import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsInputText } from './xs-input-text';

describe('XsInputText', () => {
  let component: XsInputText;
  let fixture: ComponentFixture<XsInputText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsInputText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsInputText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
