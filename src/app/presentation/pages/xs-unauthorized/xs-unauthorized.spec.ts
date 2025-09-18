import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsUnauthorized } from './xs-unauthorized';

describe('XsUnauthorized', () => {
  let component: XsUnauthorized;
  let fixture: ComponentFixture<XsUnauthorized>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsUnauthorized]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsUnauthorized);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
