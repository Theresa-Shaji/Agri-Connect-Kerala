import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmarketpricereportComponent } from './productmarketpricereport.component';

describe('ProductmarketpricereportComponent', () => {
  let component: ProductmarketpricereportComponent;
  let fixture: ComponentFixture<ProductmarketpricereportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductmarketpricereportComponent]
    });
    fixture = TestBed.createComponent(ProductmarketpricereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
