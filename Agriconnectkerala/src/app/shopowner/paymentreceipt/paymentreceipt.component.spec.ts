import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentreceiptComponent } from './paymentreceipt.component';

describe('PaymentreceiptComponent', () => {
  let component: PaymentreceiptComponent;
  let fixture: ComponentFixture<PaymentreceiptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentreceiptComponent]
    });
    fixture = TestBed.createComponent(PaymentreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
