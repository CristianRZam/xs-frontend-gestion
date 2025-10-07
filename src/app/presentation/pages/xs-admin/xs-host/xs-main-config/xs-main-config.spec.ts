import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsMainConfig } from './xs-main-config';

describe('XsMainConfig', () => {
  let component: XsMainConfig;
  let fixture: ComponentFixture<XsMainConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsMainConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsMainConfig);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
