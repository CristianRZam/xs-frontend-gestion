import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsProductFilter } from './xs-product-filter';

describe('XsProductFilter', () => {
  let component: XsProductFilter;
  let fixture: ComponentFixture<XsProductFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsProductFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsProductFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
