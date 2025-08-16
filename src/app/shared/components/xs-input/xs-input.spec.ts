import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsInput } from './xs-input';

describe('XsInput', () => {
  let component: XsInput;
  let fixture: ComponentFixture<XsInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
