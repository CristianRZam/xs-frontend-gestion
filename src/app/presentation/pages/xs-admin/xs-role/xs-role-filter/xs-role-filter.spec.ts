import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsRoleFilter } from './xs-role-filter';

describe('XsRoleFilter', () => {
  let component: XsRoleFilter;
  let fixture: ComponentFixture<XsRoleFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsRoleFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsRoleFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
