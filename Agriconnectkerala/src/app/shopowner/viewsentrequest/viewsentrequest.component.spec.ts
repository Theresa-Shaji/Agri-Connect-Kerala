import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsentrequestComponent } from './viewsentrequest.component';

describe('ViewsentrequestComponent', () => {
  let component: ViewsentrequestComponent;
  let fixture: ComponentFixture<ViewsentrequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewsentrequestComponent]
    });
    fixture = TestBed.createComponent(ViewsentrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
