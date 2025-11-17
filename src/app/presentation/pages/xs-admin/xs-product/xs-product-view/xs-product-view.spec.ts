import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsProductView } from './xs-product-view';

describe('XsProductView', () => {
  let component: XsProductView;
  let fixture: ComponentFixture<XsProductView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsProductView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsProductView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
