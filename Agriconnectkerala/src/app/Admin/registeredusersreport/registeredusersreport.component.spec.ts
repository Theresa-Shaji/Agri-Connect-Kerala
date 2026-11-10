import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredusersreportComponent } from './registeredusersreport.component';

describe('RegisteredusersreportComponent', () => {
  let component: RegisteredusersreportComponent;
  let fixture: ComponentFixture<RegisteredusersreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredusersreportComponent]
    });
    fixture = TestBed.createComponent(RegisteredusersreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
