import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsTable } from './xs-table';

describe('XsTable', () => {
  let component: XsTable;
  let fixture: ComponentFixture<XsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
