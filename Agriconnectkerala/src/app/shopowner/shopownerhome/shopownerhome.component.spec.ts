import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopownerhomeComponent } from './shopownerhome.component';

describe('ShopownerhomeComponent', () => {
  let component: ShopownerhomeComponent;
  let fixture: ComponentFixture<ShopownerhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopownerhomeComponent]
    });
    fixture = TestBed.createComponent(ShopownerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
