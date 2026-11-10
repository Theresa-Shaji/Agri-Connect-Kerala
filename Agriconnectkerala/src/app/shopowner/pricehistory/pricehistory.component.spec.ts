import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PricehistoryComponent } from './pricehistory.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('PricehistoryComponent', () => {

  let component: PricehistoryComponent;
  let fixture: ComponentFixture<PricehistoryComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [
        PricehistoryComponent
      ],

      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]

    }).compileComponents();


    fixture = TestBed.createComponent(PricehistoryComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });


  it('should create', () => {

    expect(component).toBeTruthy();

  });

});