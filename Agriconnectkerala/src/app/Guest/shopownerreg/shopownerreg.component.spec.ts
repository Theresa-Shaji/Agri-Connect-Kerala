import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopownerregComponent } from './shopownerreg.component';

describe('ShopownerregComponent', () => {
  let component: ShopownerregComponent;
  let fixture: ComponentFixture<ShopownerregComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopownerregComponent]
    });
    fixture = TestBed.createComponent(ShopownerregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
