import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerproductviewComponent } from './buyerproductview.component';

describe('BuyerproductviewComponent', () => {
  let component: BuyerproductviewComponent;
  let fixture: ComponentFixture<BuyerproductviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerproductviewComponent]
    });
    fixture = TestBed.createComponent(BuyerproductviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
