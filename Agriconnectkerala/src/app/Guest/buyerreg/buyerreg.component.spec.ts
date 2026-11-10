import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerregComponent } from './buyerreg.component';

describe('BuyerregComponent', () => {
  let component: BuyerregComponent;
  let fixture: ComponentFixture<BuyerregComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerregComponent]
    });
    fixture = TestBed.createComponent(BuyerregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
