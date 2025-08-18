import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsIngresar } from './xs-ingresar';

describe('XsIngresar', () => {
  let component: XsIngresar;
  let fixture: ComponentFixture<XsIngresar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsIngresar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsIngresar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
