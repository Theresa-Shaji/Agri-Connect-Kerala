import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerhomeComponent } from './buyerhome.component';

describe('BuyerhomeComponent', () => {
  let component: BuyerhomeComponent;
  let fixture: ComponentFixture<BuyerhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerhomeComponent]
    });
    fixture = TestBed.createComponent(BuyerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
