import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsLoginView } from './xs-login-view';

describe('XsLoginView', () => {
  let component: XsLoginView;
  let fixture: ComponentFixture<XsLoginView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsLoginView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsLoginView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
