import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendpurchaserequestComponent } from './sendpurchaserequest.component';

describe('SendpurchaserequestComponent', () => {
  let component: SendpurchaserequestComponent;
  let fixture: ComponentFixture<SendpurchaserequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendpurchaserequestComponent]
    });
    fixture = TestBed.createComponent(SendpurchaserequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
