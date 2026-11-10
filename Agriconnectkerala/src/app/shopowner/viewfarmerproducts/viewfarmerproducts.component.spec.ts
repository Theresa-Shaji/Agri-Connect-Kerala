import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfarmerproductsComponent } from './viewfarmerproducts.component';

describe('ViewfarmerproductsComponent', () => {
  let component: ViewfarmerproductsComponent;
  let fixture: ComponentFixture<ViewfarmerproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewfarmerproductsComponent]
    });
    fixture = TestBed.createComponent(ViewfarmerproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
