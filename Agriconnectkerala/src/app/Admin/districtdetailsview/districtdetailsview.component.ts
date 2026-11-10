import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-districtdetailsview',
  templateUrl: './districtdetailsview.component.html',
  styleUrls: ['./districtdetailsview.component.scss']
})
export class DistrictdetailsviewComponent {
 public districtArray: any[] = [];
    constructor(private fb: FormBuilder,private router: Router, private dbservice: DbserviceService) { }
  
    ngOnInit(): void {
      this.dbservice.districtview().then((data: any) => { 
        this.districtArray = data;
        console.log(data)
      });
    }
    Deletedistrictdata(districtid: string) {
      this.dbservice.Deletedistrictdata({ districtid }).then((confirmation: any) => {
        if (confirmation.message=== "Success") {
          alert('Sucessfully Deleted')
        }
      })
  
    }

}
