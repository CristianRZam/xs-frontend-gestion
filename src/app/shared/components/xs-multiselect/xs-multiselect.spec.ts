import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsMultiselect } from './xs-multiselect';

describe('XsMultiselect', () => {
  let component: XsMultiselect;
  let fixture: ComponentFixture<XsMultiselect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsMultiselect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsMultiselect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
