import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsTextArea } from './xs-text-area';

describe('XsTextArea', () => {
  let component: XsTextArea;
  let fixture: ComponentFixture<XsTextArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsTextArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsTextArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
