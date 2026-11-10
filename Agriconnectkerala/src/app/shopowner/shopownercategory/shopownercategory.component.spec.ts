import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopownercategoryComponent } from './shopownercategory.component';

describe('ShopownercategoryComponent', () => {
  let component: ShopownercategoryComponent;
  let fixture: ComponentFixture<ShopownercategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopownercategoryComponent]
    });
    fixture = TestBed.createComponent(ShopownercategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
