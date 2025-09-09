import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsRoleCardDetail } from './xs-role-card-detail';

describe('XsRoleCardDetail', () => {
  let component: XsRoleCardDetail;
  let fixture: ComponentFixture<XsRoleCardDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsRoleCardDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsRoleCardDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
