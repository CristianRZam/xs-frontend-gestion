import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsRoleTable } from './xs-role-table';

describe('XsRoleTable', () => {
  let component: XsRoleTable;
  let fixture: ComponentFixture<XsRoleTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsRoleTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsRoleTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
