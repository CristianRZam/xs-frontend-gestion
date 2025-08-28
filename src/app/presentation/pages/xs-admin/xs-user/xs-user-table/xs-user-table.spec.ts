import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsUserTable } from './xs-user-table';

describe('XsUserTable', () => {
  let component: XsUserTable;
  let fixture: ComponentFixture<XsUserTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsUserTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsUserTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
