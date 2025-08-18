import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsHome } from './xs-home';

describe('XsHome', () => {
  let component: XsHome;
  let fixture: ComponentFixture<XsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
