import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-buyerreg',
  templateUrl: './buyerreg.component.html',
  styleUrls: ['./buyerreg.component.scss']
})
export class BuyerregComponent implements OnInit {

  buyer: any = {
    name: '',
    email: '',
    phone: '',
    districtid: '',
    locationid: '',
    address: '',
    username: '',
    password: ''
  };

  districtArray: any[] = [];
  locationArray: any[] = [];

  submitted: boolean = false;
  showPassword: boolean = false;

  constructor(
    private db: DbserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDistrict();
  }

  getDistrict() {

    this.db.getDistrict().subscribe((result: any) => {

      this.districtArray = result;

    });

  }

  getLocation() {

    this.buyer.locationid = '';
    this.locationArray = [];

    if (this.buyer.districtid) {

      this.db.getLocation(this.buyer.districtid)
        .subscribe((result: any) => {

          this.locationArray = result;

        });

    }

  }

  isValidEmail(): boolean {

    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(this.buyer.email);

  }

  isValidPhone(): boolean {

    const phonePattern = /^[6-9][0-9]{9}$/;

    return phonePattern.test(this.buyer.phone);

  }

  isValidPassword(): boolean {

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordPattern.test(this.buyer.password);

  }

  isFormValid(): boolean {

    return (
      this.buyer.name &&
      this.buyer.name.length >= 3 &&
      /^[A-Za-z ]+$/.test(this.buyer.name) &&

      this.isValidEmail() &&

      this.isValidPhone() &&

      this.buyer.districtid &&

      this.buyer.locationid &&

      this.buyer.address &&
      this.buyer.address.length >= 5 &&

      this.buyer.username &&
      /^[A-Za-z][A-Za-z0-9_]{4,29}$/.test(
        this.buyer.username
      ) &&

      this.isValidPassword()
    );

  }

  registerBuyer() {

    this.submitted = true;

    if (!this.isFormValid()) {
      return;
    }

    console.log(
      "Buyer Registration Data:",
      this.buyer
    );

    this.db.buyerreg(this.buyer)
      .then((result: any) => {

        console.log(
          "Buyer Registration Response:",
          result
        );

        if (
          result &&
          result.status === 'success'
        ) {

          alert(
            "Buyer Registration Successful! Please login."
          );

          // REDIRECT TO LOGIN PAGE
          this.router.navigate([
            '/guestmaster/login'
          ]);

        }
        else {

          alert(
            result.message ||
            "Registration failed."
          );

        }

      })
      .catch((error: any) => {

        console.log(
          "Buyer Registration Error:",
          error
        );

        if (
          error.error &&
          error.error.message
        ) {

          alert(error.error.message);

        }
        else {

          alert(
            "Registration failed. Please try again."
          );

        }

      });

  }

}