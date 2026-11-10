import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-buyerviewpurchaserequest',
  templateUrl: './buyerviewpurchaserequest.component.html',
  styleUrls: ['./buyerviewpurchaserequest.component.scss']
})
export class BuyerviewpurchaserequestComponent implements OnInit {

  requestArray: any[] = [];

  buyerid: any;

  constructor(
    private db: DbserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.buyerid =
      localStorage.getItem('buyerid');

    console.log(
      'Logged in Buyer ID:',
      this.buyerid
    );

    this.loadRequests();

  }


  // =====================================================
  // LOAD BUYER SENT REQUESTS
  // =====================================================

  loadRequests(): void {

    if (!this.buyerid) {

      console.log(
        'Buyer ID not found'
      );

      return;

    }


    const data = {

      buyerid:
        this.buyerid

    };


    console.log(
      'Loading Buyer Requests:',
      data
    );


    this.db.viewBuyerSentRequests(data)

      .then((result: any) => {

        console.log(
          'Buyer Sent Requests:',
          result
        );


        if (
          result &&
          Array.isArray(result)
        ) {

          this.requestArray =
            result;

        } else {

          this.requestArray = [];

        }


        // =================================================
        // CALCULATE TOTAL AMOUNT
        // =================================================

        this.requestArray.forEach(
          (request: any) => {

            request.requestquantity =
              Number(
                request.requestquantity || 0
              );


            request.offeredprice =
              Number(
                request.offeredprice || 0
              );


            request.expectedprice =
              Number(
                request.expectedprice || 0
              );


            request.availablequantity =
              Number(
                request.availablequantity || 0
              );


            request.totalamount =
              request.requestquantity *
              request.offeredprice;


            request.advamount =
              Number(
                request.advamount || 0
              );


            request.paymentstatus =
              request.paymentstatus || '';


          }
        );


        console.log(
          'Processed Requests:',
          this.requestArray
        );

      })


      .catch((error: any) => {

        console.log(
          'Buyer Sent Request Error:',
          error
        );

        this.requestArray = [];

      });

  }


  // =====================================================
  // MAKE PAYMENT
  // =====================================================

  makePayment(requestid: any): void {

    console.log(
      'Make Payment clicked'
    );

    console.log(
      'Request ID:',
      requestid
    );


    if (!requestid) {

      alert(
        'Request ID not found'
      );

      return;

    }


    this.router.navigate([
      '/buyermaster/buyerpayment',
      requestid
    ]);

  }


  // =====================================================
  // VIEW PAYMENT RECEIPT
  // =====================================================

  viewReceipt(request: any): void {

    console.log(
      'View Receipt clicked:',
      request
    );


    if (!request) {

      alert(
        'Payment details not found.'
      );

      return;

    }


    if (!request.requestid) {

      alert(
        'Request ID not found.'
      );

      return;

    }


    if (
      !request.paymentstatus ||
      String(request.paymentstatus).toLowerCase() !== 'paid'
    ) {

      alert(
        'Payment has not been completed yet.'
      );

      return;

    }


    // =====================================================
    // OPEN EXISTING PAYMENT SUCCESS / RECEIPT PAGE
    // =====================================================

    this.router.navigate(
      ['/buyermaster/paymentsuccess'],
      {

        queryParams: {

          requestid:
            request.requestid,

          transactionid:
            request.transactionid || '',

          farmername:
            request.farmername || '',

          productname:
            request.productname || '',

          quantity:
            request.requestquantity || 0,

          unit:
            request.unit || '',

          priceperunit:
            request.offeredprice || 0,

          totalamount:
            request.totalamount || 0,

          advamount:
            request.advamount || 0

        }

      }
    );

  }

}