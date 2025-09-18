import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsParameterView } from './xs-parameter-view';

describe('XsParameterView', () => {
  let component: XsParameterView;
  let fixture: ComponentFixture<XsParameterView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsParameterView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsParameterView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
