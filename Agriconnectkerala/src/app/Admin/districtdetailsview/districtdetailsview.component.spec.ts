import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictdetailsviewComponent } from './districtdetailsview.component';

describe('DistrictdetailsviewComponent', () => {
  let component: DistrictdetailsviewComponent;
  let fixture: ComponentFixture<DistrictdetailsviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistrictdetailsviewComponent]
    });
    fixture = TestBed.createComponent(DistrictdetailsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
