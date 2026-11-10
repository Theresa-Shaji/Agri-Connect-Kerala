import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopownerverificationComponent } from './shopownerverification.component';

describe('ShopownerverificationComponent', () => {
  let component: ShopownerverificationComponent;
  let fixture: ComponentFixture<ShopownerverificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopownerverificationComponent]
    });
    fixture = TestBed.createComponent(ShopownerverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
