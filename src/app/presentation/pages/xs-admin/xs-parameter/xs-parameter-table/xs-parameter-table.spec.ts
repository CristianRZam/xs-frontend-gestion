import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsParameterTable } from './xs-parameter-table';

describe('XsParameterTable', () => {
  let component: XsParameterTable;
  let fixture: ComponentFixture<XsParameterTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsParameterTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsParameterTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
