import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-shopownerreg',
  templateUrl: './shopownerreg.component.html',
  styleUrls: ['./shopownerreg.component.scss']
})
export class ShopownerregComponent {

  validationstatus = false;

  public districtArray: any[] = [];
  public LocationdataArray: any[] = [];

  selectedFiles?: FileList;
  selectedLicenseFile: File | null = null;

  registerform!: FormGroup;

  showPassword = false;
  submitted = false;

  constructor(
    private db: DbserviceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.registerform = this.fb.group({

      // Shop Details
      shopname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],

      shopownername: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[A-Za-z ]+$/)
        ]
      ],

      // Personal Details
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone_number: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9][0-9]{9}$/)
        ]
      ],

      // Location
      districtid: [
        '',
        Validators.required
      ],

      locationid: [
        '',
        Validators.required
      ],

      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250)
        ]
      ],

      // License
      licenseno: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
        ]
      ],

      // Account
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-z][A-Za-z0-9_]*$/)
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/
          )
        ]
      ]

    });

    // Load districts
    this.db.districtview().then((data: any) => {

      this.districtArray = data;

    }).catch((error: any) => {

      console.error('District loading error:', error);

    });

  }


  // ============================
  // DISTRICT CHANGE
  // ============================

  onChange(): void {

    const districtid =
      this.registerform.get('districtid')?.value;

    // Clear location
    this.LocationdataArray = [];

    this.registerform.patchValue({
      locationid: ''
    });

    if (!districtid) {
      return;
    }

    this.db.getdistrictbyid({
      districtid: districtid
    }).then((data: any) => {

      this.LocationdataArray = data;

    }).catch((error: any) => {

      console.error('Location loading error:', error);

    });

  }


  // ============================
  // SHOP IMAGE
  // ============================

  selectFile(event: any): void {

    if (
      event.target.files &&
      event.target.files.length > 0
    ) {

      this.selectedFiles = event.target.files;

    }

  }


  // ============================
  // LICENSE DOCUMENT
  // ============================

  selectLicenseFile(event: any): void {

    if (
      event.target.files &&
      event.target.files.length > 0
    ) {

      this.selectedLicenseFile =
        event.target.files[0];

    }

  }


  // ============================
  // PASSWORD VALIDATION
  // ============================

  isValidPassword(): boolean {

    const password =
      this.registerform.get('password')?.value;

    if (!password) {
      return false;
    }

    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

    return pattern.test(password);

  }


  // ============================
  // EMAIL VALIDATION
  // ============================

  isValidEmail(): boolean {

    const email =
      this.registerform.get('email')?.value;

    if (!email) {
      return false;
    }

    const pattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

  }


  // ============================
  // PHONE VALIDATION
  // ============================

  isValidPhone(): boolean {

    const phone =
      this.registerform.get('phone_number')?.value;

    if (!phone) {
      return false;
    }

    return /^[6-9][0-9]{9}$/.test(phone);

  }


  // ============================
  // SUBMIT
  // ============================

  onSubmit(): void {

    this.submitted = true;

    this.registerform.markAllAsTouched();

    // Check form
    if (this.registerform.invalid) {

      alert('Please correct the errors in the form.');

      return;

    }


    // Check shop image
    if (
      !this.selectedFiles ||
      this.selectedFiles.length === 0
    ) {

      alert('Please select a shop image.');

      return;

    }


    // Check license document
    if (!this.selectedLicenseFile) {

      alert('Please select the license document.');

      return;

    }


    const formData = new FormData();


    // ============================
    // APPEND FORM VALUES
    // ============================

    formData.append(
      'shopname',
      this.registerform.value.shopname
    );

    formData.append(
      'shopownername',
      this.registerform.value.shopownername
    );

    formData.append(
      'email',
      this.registerform.value.email
    );

    formData.append(
      'phone_number',
      this.registerform.value.phone_number
    );

    formData.append(
      'districtid',
      this.registerform.value.districtid
    );

    formData.append(
      'locationid',
      this.registerform.value.locationid
    );

    formData.append(
      'address',
      this.registerform.value.address
    );

    formData.append(
      'licenseno',
      this.registerform.value.licenseno
    );

    formData.append(
      'username',
      this.registerform.value.username
    );

    formData.append(
      'password',
      this.registerform.value.password
    );


    // ============================
    // SHOP IMAGE
    // ============================

    formData.append(
      'image',
      this.selectedFiles[0]
    );


    // ============================
    // LICENSE DOCUMENT
    // ============================

    formData.append(
      'licensedocument',
      this.selectedLicenseFile
    );


    console.log('Submitting Shop Owner Registration');


    // ============================
    // BACKEND REQUEST
    // ============================

    this.db.shopownerreg(formData)
      .then((confirmation: any) => {

        console.log(
          'Registration Response:',
          confirmation
        );


        if (
          confirmation &&
          confirmation.message === 'Success'
        ) {

          alert(
            'Shop Owner Registered Successfully'
          );

          this.registerform.reset();

          this.selectedFiles = undefined;
          this.selectedLicenseFile = null;

          this.submitted = false;

          this.router.navigate([
            '/guestmaster/login'
          ]);

        }

        else if (
          confirmation &&
          confirmation.message === 'Failed'
        ) {

          alert(
            'Username Already Exists'
          );

        }

        else {

          alert(
            'Registration Failed'
          );

        }

      })
      .catch((error: any) => {

        console.error(
          'Registration Error:',
          error
        );

        alert(
          'Something went wrong during registration.'
        );

      });

  }

}