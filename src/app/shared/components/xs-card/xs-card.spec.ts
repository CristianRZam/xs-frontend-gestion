import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XsCard } from './xs-card';

describe('XsCard', () => {
  let component: XsCard;
  let fixture: ComponentFixture<XsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
