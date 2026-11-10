import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-buyerpayment',
  templateUrl: './buyerpayment.component.html',
  styleUrls: ['./buyerpayment.component.scss']
})
export class BuyerpaymentComponent implements OnInit {

  requestid: any;
  buyerid: any;

  paymentDetails: any = null;

  totalAmount: number = 0;
  advanceAmount: number = 0;

  loading: boolean = true;
  processingPayment: boolean = false;

  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: DbserviceService
  ) {}

  ngOnInit(): void {

    this.requestid =
      this.route.snapshot.paramMap.get('requestid');

    this.buyerid =
      localStorage.getItem('buyerid');

    console.log('Request ID:', this.requestid);
    console.log('Buyer ID:', this.buyerid);


    if (!this.requestid) {

      this.loading = false;

      this.errorMessage =
        'Purchase request ID not found.';

      return;
    }


    if (!this.buyerid) {

      this.loading = false;

      this.errorMessage =
        'Buyer ID not found. Please login again.';

      return;
    }


    this.loadPaymentDetails();
  }


  // =====================================================
  // LOAD PAYMENT DETAILS
  // =====================================================

  loadPaymentDetails(): void {

    const data = {

      requestid:
        this.requestid,

      buyerid:
        this.buyerid

    };


    this.db.buyerPaymentDetails(data)

      .then((result: any) => {

        console.log(
          'Buyer Payment Details:',
          result
        );


        this.loading = false;


        if (
          result &&
          result.status === 'success' &&
          result.data
        ) {

          this.paymentDetails =
            result.data;


          const quantity =
            Number(
              this.paymentDetails.requestquantity || 0
            );


          const price =
            Number(
              this.paymentDetails.offeredprice || 0
            );


          this.totalAmount =
            quantity * price;


          this.advanceAmount =
            this.totalAmount * 0.20;


          this.totalAmount =
            Number(
              this.totalAmount.toFixed(2)
            );


          this.advanceAmount =
            Number(
              this.advanceAmount.toFixed(2)
            );


        } else {

          this.paymentDetails = null;

          this.errorMessage =
            result?.message ||
            'Payment details not found.';

        }

      })

      .catch((error: any) => {

        console.log(
          'Buyer Payment Details Error:',
          error
        );


        this.loading = false;

        this.paymentDetails = null;

        this.errorMessage =
          'Unable to load payment details.';

      });

  }


  // =====================================================
  // PAY NOW
  // =====================================================

  payNow(): void {

    if (!this.paymentDetails) {

      alert(
        'Payment details are not available.'
      );

      return;
    }


    if (this.advanceAmount <= 0) {

      alert(
        'Invalid advance payment amount.'
      );

      return;
    }


    if (this.processingPayment) {
      return;
    }


    // =====================================================
    // CONFIRMATION ALERT
    // =====================================================

    const confirmPayment = confirm(

      `Are you sure you want to pay ₹${this.advanceAmount.toFixed(2)} as advance payment?`

    );


    if (!confirmPayment) {

      alert(
        'Payment cancelled.'
      );

      return;
    }


    this.processingPayment = true;


    // =====================================================
    // PAYMENT DATA
    // =====================================================

    const data = {

      requestid:
        this.paymentDetails.requestid,

      buyerid:
        this.buyerid,

      farmerid:
        this.paymentDetails.farmerid,

      productid:
        this.paymentDetails.productid,

      quantity:
        this.paymentDetails.requestquantity,

      priceperunit:
        this.paymentDetails.offeredprice,

      totalamount:
        this.totalAmount,

      advamount:
        this.advanceAmount

    };


    console.log(
      'Saving Buyer Payment:',
      data
    );


    // =====================================================
    // SAVE PAYMENT
    // =====================================================

    this.db.saveBuyerPayment(data)

      .then((result: any) => {

        console.log(
          'Save Buyer Payment Response:',
          result
        );


        this.processingPayment = false;


        // =================================================
        // SUCCESS
        // =================================================

        if (
          result &&
          result.status === 'success'
        ) {

          const transactionId =
            result.transactionid;


          // =================================================
          // SUCCESS ALERT
          // =================================================

          alert(
            `Payment of ₹${this.advanceAmount.toFixed(2)} completed successfully!\n\nTransaction ID: ${transactionId}`
          );


          // =================================================
          // REDIRECT TO PAYMENT SUCCESS PAGE
          // =================================================

          this.router.navigate(
            ['/buyermaster/paymentsuccess'],
            {

              queryParams: {

                transactionid:
                  transactionId,

                farmername:
                  this.paymentDetails.farmername,

                productname:
                  this.paymentDetails.productname,

                quantity:
                  this.paymentDetails.requestquantity,

                unit:
                  this.paymentDetails.unit,

                priceperunit:
                  this.paymentDetails.offeredprice,

                totalamount:
                  this.totalAmount,

                advamount:
                  this.advanceAmount

              },

              replaceUrl: true

            }
          );

        }

        // =================================================
        // FAILED
        // =================================================

        else {

          alert(

            result?.message ||
            'Payment could not be completed.'

          );

        }

      })

      .catch((error: any) => {

        console.log(
          'Save Buyer Payment Error:',
          error
        );


        this.processingPayment = false;


        alert(
          'Unable to process payment. Please try again.'
        );

      });

  }

}