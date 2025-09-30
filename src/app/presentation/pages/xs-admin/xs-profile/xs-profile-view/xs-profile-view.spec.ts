import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsProfileView } from './xs-profile-view';

describe('XsProfileView', () => {
  let component: XsProfileView;
  let fixture: ComponentFixture<XsProfileView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsProfileView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsProfileView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
