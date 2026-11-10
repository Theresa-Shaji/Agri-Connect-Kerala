import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-editlocation',
  templateUrl: './editlocation.component.html',
  styleUrls: ['./editlocation.component.scss']
})
export class EditlocationComponent {
 locationid: any; // Correct the property name to 'ategoryId'
  public LocationdataArray: any;
  public districtArray: any[] = []; 
  editlocation!: FormGroup;

  constructor(private fb: FormBuilder, private router :Router, private route: ActivatedRoute, private dbservice: DbserviceService) {
    route.paramMap.subscribe((params: ParamMap) => {
      this.locationid = params.get('id')
    })

    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.CourseId = params.get('id'); // Use 'CourseId' here
    // });
  }


  //page load
  ngOnInit(): void {
    this.editlocation = this.fb.group({
      locationid: [''], // Use 'CategoryId' here
      LocationName: [''],
      districtid:['']
    })
    const id = this.locationid;
    console.log(id);
    this.dbservice.getlocationdetails({ id }).then((data: any) => { // Use 'CategoryId' here
      this.LocationdataArray = data;
      console.log(this.LocationdataArray);
      this.editlocation.setValue({
        locationid: data[0].locationid, // Use 'CourseId' here
        LocationName: data[0].locationname,
        districtid: data[0].districtname,
       
      });
    });
  }
  //End of page load

  //Submit code

  Onsubmit()
  {
   this.dbservice.updatelocation(this.editlocation.value)
   .then((confirmation: any) => {
   if (confirmation.message === "Success") 
   {
     
   alert('Location Details Updated')
   this.router.navigate(['/adminmaster/locationview'])
   }})
   }

  //End of Submit

}

