import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent {

  savestatus = false;

  constructor(
    private fb: FormBuilder,
    private db: DbserviceService,
    private router: Router
  ) { }

  DistrictRegForm = this.fb.group({

    DistrictName: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)
      ]
    ]

  });

  Onsubmit() {

    // Validation
    if (!this.DistrictRegForm.valid) {

      this.savestatus = true;

      alert('Please enter a valid district name!!');

      return;
    }

    // Save district
    console.log(this.DistrictRegForm.value);

    this.db.districtreg(this.DistrictRegForm.value)
      .then((confirmation: any) => {

        console.log('District Response:', confirmation);

        // Success
        if (confirmation.message == "Success") {

          alert('Registered Successfully');

          // Clear form
          this.DistrictRegForm.reset();

          // Redirect to District View
          this.router.navigate([
            '/adminmaster/districtview'
          ]);

        }

        // Failed
        else {

          alert('Data not inserted, please check');

        }

      })
      .catch((error: any) => {

        console.error('District Registration Error:', error);

        alert('Something went wrong. Please try again.');

      });

  }

}