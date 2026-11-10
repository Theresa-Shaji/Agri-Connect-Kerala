import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmarketpriceComponent } from './viewmarketprice.component';

describe('ViewmarketpriceComponent', () => {
  let component: ViewmarketpriceComponent;
  let fixture: ComponentFixture<ViewmarketpriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewmarketpriceComponent]
    });
    fixture = TestBed.createComponent(ViewmarketpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
