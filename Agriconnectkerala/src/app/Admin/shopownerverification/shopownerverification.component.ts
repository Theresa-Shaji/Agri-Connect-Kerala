import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-shopownerverification',
  templateUrl: './shopownerverification.component.html',
  styleUrls: ['./shopownerverification.component.scss']
})
export class ShopownerverificationComponent {

  public shopownerverificationArray: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dbservice: DbserviceService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dbservice.shopownerverification().then((data: any) => {
      this.shopownerverificationArray = data;
    });
  }

  // ACCEPT SHOP OWNER
  acceptshopownerrequest(loginid: string) {

    this.dbservice.acceptshopownerrequest({ loginid }).then((confirmation: any) => {

      console.log('Accept response:', confirmation);

      if (
        confirmation &&
        (
          confirmation.status === 'success' ||
          confirmation.message === 'Success' ||
          confirmation.message === 'success'
        )
      ) {

        alert('Shop Owner Accepted Successfully');

        this.loadData();

      } else {

        alert(confirmation?.message || 'Failed to accept shop owner');

      }

    }).catch((error: any) => {

      console.error('Accept error:', error);

      alert('Something went wrong while accepting shop owner');

    });

  }

  // REJECT SHOP OWNER
  rejectshopownerrequest(loginid: string) {

    this.dbservice.rejectshopownerrequest({ loginid }).then((confirmation: any) => {

      console.log('Reject response:', confirmation);

      if (
        confirmation &&
        (
          confirmation.status === 'success' ||
          confirmation.message === 'Success' ||
          confirmation.message === 'success'
        )
      ) {

        alert('Shop Owner Rejected Successfully');

        this.loadData();

      } else {

        alert(confirmation?.message || 'Failed to reject shop owner');

      }

    }).catch((error: any) => {

      console.error('Reject error:', error);

      alert('Something went wrong while rejecting shop owner');

    });

  }

}