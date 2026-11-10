import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpriceupdateComponent } from './editpriceupdate.component';

describe('EditpriceupdateComponent', () => {
  let component: EditpriceupdateComponent;
  let fixture: ComponentFixture<EditpriceupdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditpriceupdateComponent]
    });
    fixture = TestBed.createComponent(EditpriceupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
