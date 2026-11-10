import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewsentrequest',
  templateUrl: './viewsentrequest.component.html',
  styleUrls: ['./viewsentrequest.component.scss']
})
export class ViewsentrequestComponent implements OnInit {

  requestArray: any[] = [];


  constructor(
    private db: DbserviceService,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.loadRequests();

  }


  // =====================================
  // LOAD ONLY SHOP OWNER REQUESTS
  // =====================================

  loadRequests(): void {

    const shopownerid =
      localStorage.getItem('shopownerid');


    console.log(
      'Logged in Shop Owner ID:',
      shopownerid
    );


    if (!shopownerid) {

      console.log(
        'Shop Owner ID not found'
      );

      this.requestArray = [];

      return;

    }


    const data = {

      shopownerid: shopownerid

    };


    console.log(
      'Sending:',
      data
    );


    this.db.viewSentRequest(data)

      .then((result: any) => {

        console.log(
          'Shop Owner Sent Requests:',
          result
        );


        if (Array.isArray(result)) {

          this.requestArray = result;

        }

        else if (
          result &&
          result.status === 'success'
        ) {

          this.requestArray =
            result.data || [];

        }

        else {

          this.requestArray = [];

        }


        console.log(
          'Final Request Array:',
          this.requestArray
        );

      })

      .catch((error: any) => {

        console.log(
          'View Sent Request Error:',
          error
        );

        this.requestArray = [];

      });

  }


  // =====================================
  // PAY ADVANCE
  // =====================================

  payAdvance(requestid: any): void {

    this.router.navigate([
      '/shopownermaster/payment',
      requestid
    ]);

  }


  // =====================================
  // VIEW RECEIPT
  // =====================================

  viewReceipt(requestid: any): void {

    this.router.navigate([
      '/shopownermaster/paymentreceipt',
      requestid
    ]);

  }

}