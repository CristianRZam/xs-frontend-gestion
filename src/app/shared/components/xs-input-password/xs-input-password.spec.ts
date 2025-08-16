import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsInputPassword } from './xs-input-password';

describe('XsInputPassword', () => {
  let component: XsInputPassword;
  let fixture: ComponentFixture<XsInputPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsInputPassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsInputPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
