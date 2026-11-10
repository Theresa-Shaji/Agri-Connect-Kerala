import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaserequestreportComponent } from './purchaserequestreport.component';

describe('PurchaserequestreportComponent', () => {
  let component: PurchaserequestreportComponent;
  let fixture: ComponentFixture<PurchaserequestreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaserequestreportComponent]
    });
    fixture = TestBed.createComponent(PurchaserequestreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
