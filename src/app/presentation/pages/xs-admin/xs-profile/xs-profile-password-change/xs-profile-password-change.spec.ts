import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsProfilePasswordChange } from './xs-profile-password-change';

describe('XsProfilePasswordChange', () => {
  let component: XsProfilePasswordChange;
  let fixture: ComponentFixture<XsProfilePasswordChange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsProfilePasswordChange]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsProfilePasswordChange);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
