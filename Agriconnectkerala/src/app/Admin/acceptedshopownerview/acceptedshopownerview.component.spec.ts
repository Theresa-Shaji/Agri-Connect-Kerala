import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedshopownerviewComponent } from './acceptedshopownerview.component';

describe('AcceptedshopownerviewComponent', () => {
  let component: AcceptedshopownerviewComponent;
  let fixture: ComponentFixture<AcceptedshopownerviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedshopownerviewComponent]
    });
    fixture = TestBed.createComponent(AcceptedshopownerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
