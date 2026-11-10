import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public LoginArray: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dbservice: DbserviceService
  ) { }

  LoginFormGroup = this.fb.group({
    username: [''],
    password: ['']
  });

  Onsubmit() {

    this.dbservice.checklogin(this.LoginFormGroup.value).then((data: any) => {

      console.log("LOGIN DATA:", data);

      this.LoginArray = data;

      if (!data || data.length == 0) {

        alert("Invalid Username or Password");

        this.router.navigate(['/guestmaster/login']);

        return;
      }

      var role = this.LoginArray[0].role;
      var status = this.LoginArray[0].status;

      console.log("ROLE:", role);
      console.log("STATUS:", status);
      console.log("BUYER ID:", this.LoginArray[0].buyerid);

      localStorage.setItem(
        "loginid",
        this.LoginArray[0].loginid
      );

      localStorage.setItem(
        "username",
        this.LoginArray[0].username
      );


      // ADMIN LOGIN
      if (role.toLowerCase() == "admin") {

        this.router.navigate(['/adminmaster/adminhome']);

      }


      // SHOP OWNER LOGIN
      else if (role.toLowerCase() == "shopowner") {

        localStorage.setItem(
          "shopownerid",
          this.LoginArray[0].shopownerid
        );

        if (status == "Accepted") {

          this.router.navigate([
            '/shopownermaster/shopownerhome'
          ]);

        }
        else if (status == "Rejected") {

          alert("Your Registration is Rejected");

          this.router.navigate([
            '/guestmaster/guesthome'
          ]);

        }
        else {

          alert("Please wait for Admin Approval");

          this.router.navigate([
            '/guestmaster/guesthome'
          ]);

        }

      }


      // FARMER LOGIN
      else if (role.toLowerCase() == "farmer") {

        localStorage.setItem(
          "farmerid",
          this.LoginArray[0].farmerid
        );

        if (status == "Accepted") {

          this.router.navigate([
            '/farmermaster/farmerhome'
          ]);

        }
        else {

          alert("Your Account is Inactive");

          this.router.navigate([
            '/guestmaster/guesthome'
          ]);

        }

      }


  
    // BUYER LOGIN
// BUYER LOGIN
else if (role.toLowerCase() == "buyer") {

  localStorage.setItem(
    "buyerid",
    this.LoginArray[0].buyerid
  );

  this.router.navigate([
    '/buyermaster/buyerhome'
  ]);

}

      // INVALID ROLE
      else {

        alert("You are not an authorised person.");

        this.router.navigate([
          '/guestmaster/guesthome'
        ]);

      }

    });

  }

  ngOnInit(): void {

  }

}