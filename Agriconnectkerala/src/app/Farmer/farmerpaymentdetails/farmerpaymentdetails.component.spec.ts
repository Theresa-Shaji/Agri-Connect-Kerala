import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerpaymentdetailsComponent } from './farmerpaymentdetails.component';

describe('FarmerpaymentdetailsComponent', () => {
  let component: FarmerpaymentdetailsComponent;
  let fixture: ComponentFixture<FarmerpaymentdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerpaymentdetailsComponent]
    });
    fixture = TestBed.createComponent(FarmerpaymentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
