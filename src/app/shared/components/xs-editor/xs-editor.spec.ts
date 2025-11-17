import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsEditor } from './xs-editor';

describe('XsEditor', () => {
  let component: XsEditor;
  let fixture: ComponentFixture<XsEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
