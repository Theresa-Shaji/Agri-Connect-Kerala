import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerproductdetailsComponent } from './buyerproductdetails.component';

describe('BuyerproductdetailsComponent', () => {
  let component: BuyerproductdetailsComponent;
  let fixture: ComponentFixture<BuyerproductdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerproductdetailsComponent]
    });
    fixture = TestBed.createComponent(BuyerproductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
