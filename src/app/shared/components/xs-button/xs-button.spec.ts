import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsButton } from './xs-button';

describe('XsButton', () => {
  let component: XsButton;
  let fixture: ComponentFixture<XsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
