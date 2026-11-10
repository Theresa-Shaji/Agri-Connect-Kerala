import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
 savestatus = false;
  public districtdataarray:any[]=[]; 
  constructor(private fb: FormBuilder, private router:Router ,private dbservice: DbserviceService){} 
 
  ngOnInit():void 
{ 
    this.dbservice.districtview().then((data:any)=>{ 
    this.districtdataarray=data; 
    console.log(data); 
    });
  }
  locationForm = this.fb.group({ 
    LocationName: ['',[Validators.required,Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)]],
    districtid:['',Validators.required]
  });
  Onsubmit() { 
    if (!this.locationForm.valid) {
      this.savestatus = true
      alert('Please data valid data!!')
      return
    }
    else {
    console.log(this.locationForm.value) ;
    this.dbservice.location(this.locationForm.value).then((confirmation: any) => { 
      if (confirmation.message == "Success") { 
        alert('Registered Successfully') 
        window.location.href='/adminmaster/location'
      } 
      else { 
        window.location.href='/adminmaster/location'
  
      } 
    }) 
  }
  } 
}
