import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsParameterCardDetail } from './xs-parameter-card-detail';

describe('XsParameterCardDetail', () => {
  let component: XsParameterCardDetail;
  let fixture: ComponentFixture<XsParameterCardDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsParameterCardDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsParameterCardDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
