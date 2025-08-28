import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsUserFilter } from './xs-user-filter';

describe('XsUserFilter', () => {
  let component: XsUserFilter;
  let fixture: ComponentFixture<XsUserFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsUserFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsUserFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
