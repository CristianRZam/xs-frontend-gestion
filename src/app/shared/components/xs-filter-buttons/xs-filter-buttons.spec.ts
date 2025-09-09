import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsFilterButtons } from './xs-filter-buttons';

describe('XsFilterButtons', () => {
  let component: XsFilterButtons;
  let fixture: ComponentFixture<XsFilterButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsFilterButtons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsFilterButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
