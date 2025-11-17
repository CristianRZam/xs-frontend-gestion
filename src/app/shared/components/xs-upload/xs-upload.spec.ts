import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsUpload } from './xs-upload';

describe('XsUpload', () => {
  let component: XsUpload;
  let fixture: ComponentFixture<XsUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
