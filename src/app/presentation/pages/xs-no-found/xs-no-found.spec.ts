import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsNoFound } from './xs-no-found';

describe('XsNoFound', () => {
  let component: XsNoFound;
  let fixture: ComponentFixture<XsNoFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsNoFound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsNoFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
