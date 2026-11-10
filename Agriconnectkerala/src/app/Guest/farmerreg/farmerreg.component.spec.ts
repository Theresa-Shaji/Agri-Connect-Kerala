import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerregComponent } from './farmerreg.component';

describe('FarmerregComponent', () => {
  let component: FarmerregComponent;
  let fixture: ComponentFixture<FarmerregComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerregComponent]
    });
    fixture = TestBed.createComponent(FarmerregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
