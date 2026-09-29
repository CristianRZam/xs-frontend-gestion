import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsProductCatalogDialog } from './xs-product-catalog-dialog';

describe('XsProductCatalogDialog', () => {
  let component: XsProductCatalogDialog;
  let fixture: ComponentFixture<XsProductCatalogDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsProductCatalogDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsProductCatalogDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
