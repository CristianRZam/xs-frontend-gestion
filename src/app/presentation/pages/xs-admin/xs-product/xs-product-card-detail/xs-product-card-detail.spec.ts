import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsProductCardDetail } from './xs-product-card-detail';

describe('XsProductCardDetail', () => {
  let component: XsProductCardDetail;
  let fixture: ComponentFixture<XsProductCardDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsProductCardDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsProductCardDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
