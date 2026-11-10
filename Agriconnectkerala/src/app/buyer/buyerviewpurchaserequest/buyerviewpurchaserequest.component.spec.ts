import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerviewpurchaserequestComponent } from './buyerviewpurchaserequest.component';

describe('BuyerviewpurchaserequestComponent', () => {
  let component: BuyerviewpurchaserequestComponent;
  let fixture: ComponentFixture<BuyerviewpurchaserequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerviewpurchaserequestComponent]
    });
    fixture = TestBed.createComponent(BuyerviewpurchaserequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
