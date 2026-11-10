import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyermasterComponent } from './buyermaster.component';

describe('BuyermasterComponent', () => {
  let component: BuyermasterComponent;
  let fixture: ComponentFixture<BuyermasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyermasterComponent]
    });
    fixture = TestBed.createComponent(BuyermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
