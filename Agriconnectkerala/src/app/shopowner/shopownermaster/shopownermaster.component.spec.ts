import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopownermasterComponent } from './shopownermaster.component';

describe('ShopownermasterComponent', () => {
  let component: ShopownermasterComponent;
  let fixture: ComponentFixture<ShopownermasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopownermasterComponent]
    });
    fixture = TestBed.createComponent(ShopownermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
