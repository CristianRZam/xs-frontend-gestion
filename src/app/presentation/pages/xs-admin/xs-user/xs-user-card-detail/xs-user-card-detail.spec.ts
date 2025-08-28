import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsUserCardDetail } from './xs-user-card-detail';

describe('XsUserCardDetail', () => {
  let component: XsUserCardDetail;
  let fixture: ComponentFixture<XsUserCardDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsUserCardDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsUserCardDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
