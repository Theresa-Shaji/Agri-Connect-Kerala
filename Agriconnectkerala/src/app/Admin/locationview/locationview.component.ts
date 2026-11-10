import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-locationview',
  templateUrl: './locationview.component.html',
  styleUrls: ['./locationview.component.scss']
})
export class LocationviewComponent {

  public districtArray: any[] = [];
  public LocationdataArray: any[] = [];

  locationformgroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dbservice: DbserviceService
  ) { }

  ngOnInit(): void {

    this.locationformgroup = this.fb.group({
      districtid: [''],
    });

    this.dbservice.districtview().then((data: any) => {
      this.districtArray = data;
    });

    this.dbservice.locationview().then((data: any) => {
      this.LocationdataArray = data;
    });

  }

  onChange() {
    const districtid = this.locationformgroup.value.districtid;
    console.log(districtid);

    this.dbservice.getdistrictbyid({ districtid }).then((data: any) => {
      this.LocationdataArray = data;
      console.log(this.LocationdataArray);
    });
  }

  DeleteLocation(locationid: any) {
    if (confirm('Are you sure you want to delete?')) {

      this.dbservice.deletelocation({ locationid }).then((data: any) => {

        alert('Location Deleted Successfully');

        this.dbservice.locationview().then((data: any) => {
          this.LocationdataArray = data;
        });

      });

    }
  }

}