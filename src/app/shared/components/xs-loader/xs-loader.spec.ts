import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsLoader } from './xs-loader';

describe('XsLoader', () => {
  let component: XsLoader;
  let fixture: ComponentFixture<XsLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
