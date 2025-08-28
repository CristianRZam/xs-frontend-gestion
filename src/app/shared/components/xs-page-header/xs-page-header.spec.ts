import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsPageHeader } from './xs-page-header';

describe('XsPageHeader', () => {
  let component: XsPageHeader;
  let fixture: ComponentFixture<XsPageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsPageHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsPageHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
