import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsLogin } from './xs-login';

describe('XsLogin', () => {
  let component: XsLogin;
  let fixture: ComponentFixture<XsLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
