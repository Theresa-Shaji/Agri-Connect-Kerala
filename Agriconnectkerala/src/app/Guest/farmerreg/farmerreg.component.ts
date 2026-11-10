import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-farmerreg',
  templateUrl: './farmerreg.component.html',
  styleUrls: ['./farmerreg.component.scss']
})
export class FarmerregComponent implements OnInit {

  districtArray: any[] = [];
  locationArray: any[] = [];

  farmer: any = {

    name: '',
    email: '',
    phone: '',
    districtid: '',
    locationid: '',
    address: '',
    regdate: '',
    status: 'Accepted',
    image: '',
    username: '',
    password: ''

  };

  constructor(
    private db: DbserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.farmer.regdate = new Date().toISOString().split('T')[0];

    this.loadDistrict();

  }

  // Load District

  loadDistrict() {

    this.db.districtview().then((result: any) => {

      this.districtArray = result;

    });

  }

  // Load Location

  loadLocation() {

    let data = {

      districtid: this.farmer.districtid

    };

    this.db.getdistrictbyid(data).then((result: any) => {

      this.locationArray = result;

    });

  }

  // Upload Image

  uploadImage(event: any) {

    const file = event.target.files[0];

    if (file) {

      this.db.upload(file).subscribe((res: any) => {

        if (res.body) {

          this.farmer.image = res.body.filename;

        }

      });

    }

  }

  // Register Farmer

  register() {

    this.db.farmerreg(this.farmer).then((result: any) => {

      console.log(result);

      if (result.status == "success") {

        alert("Farmer Registered Successfully");

        this.router.navigate(['/guestmaster/login']);

      }
      else {

        alert("Registration Failed");

      }

    });

  }

}