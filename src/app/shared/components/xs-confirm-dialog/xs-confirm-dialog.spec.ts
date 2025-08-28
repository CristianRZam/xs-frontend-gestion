import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsConfirmDialog } from './xs-confirm-dialog';

describe('XsConfirmDialog', () => {
  let component: XsConfirmDialog;
  let fixture: ComponentFixture<XsConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsConfirmDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
