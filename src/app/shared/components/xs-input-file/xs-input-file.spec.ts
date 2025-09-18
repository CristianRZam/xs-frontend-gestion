import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsInputFile } from './xs-input-file';

describe('XsInputFile', () => {
  let component: XsInputFile;
  let fixture: ComponentFixture<XsInputFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsInputFile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsInputFile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
