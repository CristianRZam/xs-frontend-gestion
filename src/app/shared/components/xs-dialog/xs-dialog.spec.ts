import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsDialog } from './xs-dialog';

describe('XsDialog', () => {
  let component: XsDialog;
  let fixture: ComponentFixture<XsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
