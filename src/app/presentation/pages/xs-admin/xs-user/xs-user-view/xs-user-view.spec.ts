import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsUserView } from './xs-user-view';

describe('XsUserView', () => {
  let component: XsUserView;
  let fixture: ComponentFixture<XsUserView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsUserView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsUserView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
