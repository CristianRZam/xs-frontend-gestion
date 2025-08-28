import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsHostView } from './xs-host-view';

describe('XsHostView', () => {
  let component: XsHostView;
  let fixture: ComponentFixture<XsHostView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsHostView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsHostView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
