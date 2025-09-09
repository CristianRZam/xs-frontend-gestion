import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsRoleView } from './xs-role-view';

describe('XsRoleView', () => {
  let component: XsRoleView;
  let fixture: ComponentFixture<XsRoleView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsRoleView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsRoleView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
