import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-editdistrict',
  templateUrl: './editdistrict.component.html',
  styleUrls: ['./editdistrict.component.scss']
})
export class EditdistrictComponent {

districtid: any; // Correct the property name to 'ategoryId'
 
  public districtArray: any[] = []; 
  editdistrict!: FormGroup;

  constructor(private fb: FormBuilder, private router :Router, private route: ActivatedRoute, private dbservice: DbserviceService) {
    route.paramMap.subscribe((params: ParamMap) => {
      this.districtid = params.get('id')
    })

    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.CourseId = params.get('id'); // Use 'CourseId' here
    // });
  }


  //page load
  ngOnInit(): void {
    this.editdistrict = this.fb.group({
      districtid: [''], // Use 'CategoryId' here
      DistrictName: [''],
      
    })
    const id = this.districtid;
    console.log(id);
    this.dbservice.getdistrictdetails({ id }).then((data: any) => { // Use 'CategoryId' here
      this.districtArray = data;
      console.log(this.districtArray);
      this.editdistrict.setValue({
        districtid: data[0].districtid, // Use 'CourseId' here
        DistrictName: data[0].districtname,
        
       
      });
    });
  }
  //End of page load

  //Submit code

  Onsubmit()
  {
   this.dbservice.updatedistrict(this.editdistrict.value)
   .then((confirmation: any) => {
   if (confirmation.message === "Success") 
   {
     
   alert('District Details Updated')
   this.router.navigate(['/adminmaster/districtview'])
   }})
   }

  //End of Submit

}
