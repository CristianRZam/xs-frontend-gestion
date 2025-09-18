import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsParameterFilter } from './xs-parameter-filter';

describe('XsParameterFilter', () => {
  let component: XsParameterFilter;
  let fixture: ComponentFixture<XsParameterFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsParameterFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsParameterFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
