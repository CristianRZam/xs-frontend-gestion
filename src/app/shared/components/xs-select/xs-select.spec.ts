import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsSelect } from './xs-select';

describe('XsSelect', () => {
  let component: XsSelect;
  let fixture: ComponentFixture<XsSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
