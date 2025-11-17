import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsProductTable } from './xs-product-table';

describe('XsProductTable', () => {
  let component: XsProductTable;
  let fixture: ComponentFixture<XsProductTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsProductTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsProductTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
