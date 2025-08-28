import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsMainSidebar } from './xs-main-sidebar';

describe('XsMainSidebar', () => {
  let component: XsMainSidebar;
  let fixture: ComponentFixture<XsMainSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsMainSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsMainSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
