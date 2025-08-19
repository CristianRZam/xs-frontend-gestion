import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsMainHeader } from './xs-main-header';

describe('XsMainHeader', () => {
  let component: XsMainHeader;
  let fixture: ComponentFixture<XsMainHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsMainHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsMainHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
