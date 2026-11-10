import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  // =====================================================
  // REQUEST
  // =====================================================

  requestid: any = '';


  // =====================================================
  // PAYMENT DATA
  // =====================================================

  paymentData: any = null;


  // =====================================================
  // AMOUNTS
  // =====================================================

  totalPrice: number = 0;

  advanceamount: number = 0;

  remainingAmount: number = 0;


  // =====================================================
  // PAYMENT STATUS
  // =====================================================

  paymentStatus: string = 'Pending';

  processingPayment: boolean = false;


  // =====================================================
  // PAYMENT METHOD
  // =====================================================

  selectedPaymentMethod: string = 'UPI';


  // =====================================================
  // LOADING / ERROR
  // =====================================================

  loading: boolean = true;

  errorMessage: string = '';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private route: ActivatedRoute,
    private db: DbserviceService,
    private router: Router
  ) {}


  // =====================================================
  // ON INIT
  // =====================================================

  ngOnInit(): void {

    this.requestid =
      this.route.snapshot.paramMap.get('requestid') ||
      this.route.snapshot.params['requestid'];


    console.log(
      'Shop Owner Payment Request ID:',
      this.requestid
    );


    if (!this.requestid) {

      this.loading = false;

      this.errorMessage =
        'Purchase request ID not found.';

      return;
    }


    this.loadPaymentDetails();

  }


  // =====================================================
  // LOAD PAYMENT DETAILS
  // =====================================================

  loadPaymentDetails(): void {

    this.loading = true;

    this.errorMessage = '';


    const data = {

      requestid: this.requestid

    };


    console.log(
      'Payment Details Request:',
      data
    );


    this.db.paymentDetails(data)

      .then((result: any) => {

        console.log(
          'Shop Owner Payment Details:',
          result
        );


        this.loading = false;


        /*
         * Your existing backend returns an array.
         */

        if (
          result &&
          Array.isArray(result) &&
          result.length > 0
        ) {

          this.paymentData = result[0];

          this.setPaymentData();

        }

        /*
         * Also support:
         * { status: 'success', data: {...} }
         */

        else if (
          result &&
          result.status === 'success' &&
          result.data
        ) {

          this.paymentData = result.data;

          this.setPaymentData();

        }

        else {

          this.paymentData = null;

          this.errorMessage =
            'Payment details not found for this purchase request.';

        }

      })

      .catch((error: any) => {

        console.log(
          'Payment Details Error:',
          error
        );


        this.loading = false;

        this.paymentData = null;

        this.errorMessage =
          'Unable to load payment details. Please try again.';

      });

  }


  // =====================================================
  // SET PAYMENT DATA
  // =====================================================

  setPaymentData(): void {

    if (!this.paymentData) {

      return;
    }


    /*
     * Existing payment status
     */

    if (this.paymentData.paymentstatus) {

      this.paymentStatus =
        this.paymentData.paymentstatus;

    }


    /*
     * Calculate amounts
     */

    this.calculateTotal();


    console.log(
      'Payment Data:',
      this.paymentData
    );

  }


  // =====================================================
  // CALCULATE TOTAL
  // =====================================================

  calculateTotal(): void {

    const quantity =
      Number(
        this.paymentData?.quantity || 0
      );


    const offeredPrice =
      Number(
        this.paymentData?.offeredprice || 0
      );


    /*
     * Quantity × Offered Price
     */

    this.totalPrice =
      quantity * offeredPrice;


    /*
     * 20% Advance
     */

    this.advanceamount =
      this.totalPrice * 0.20;


    /*
     * Remaining amount
     */

    this.remainingAmount =
      this.totalPrice -
      this.advanceamount;


    /*
     * Round to 2 decimals
     */

    this.totalPrice =
      Number(
        this.totalPrice.toFixed(2)
      );


    this.advanceamount =
      Number(
        this.advanceamount.toFixed(2)
      );


    this.remainingAmount =
      Number(
        this.remainingAmount.toFixed(2)
      );


    console.log(
      'Quantity:',
      quantity
    );


    console.log(
      'Offered Price:',
      offeredPrice
    );


    console.log(
      'Total Price:',
      this.totalPrice
    );


    console.log(
      'Advance Amount:',
      this.advanceamount
    );


    console.log(
      'Remaining Amount:',
      this.remainingAmount
    );

  }


  // =====================================================
  // PAY NOW
  // =====================================================

  payNow(): void {


    // ---------------------------------------------------
    // PAYMENT DATA CHECK
    // ---------------------------------------------------

    if (!this.paymentData) {

      alert(
        'Payment details are not available.'
      );

      return;
    }


    // ---------------------------------------------------
    // INVALID AMOUNT
    // ---------------------------------------------------

    if (this.advanceamount <= 0) {

      alert(
        'Invalid advance payment amount.'
      );

      return;
    }


    // ---------------------------------------------------
    // DUPLICATE PAYMENT
    // ---------------------------------------------------

    if (
      this.paymentStatus === 'Paid'
    ) {

      alert(
        'Payment has already been completed.'
      );

      return;
    }


    // ---------------------------------------------------
    // PROCESSING CHECK
    // ---------------------------------------------------

    if (this.processingPayment) {

      return;
    }


    // ---------------------------------------------------
    // CONFIRM PAYMENT
    // ---------------------------------------------------

    const confirmPayment =
      confirm(
        `Are you sure you want to pay ₹${this.advanceamount.toFixed(2)} as advance payment using ${this.selectedPaymentMethod}?`
      );


    if (!confirmPayment) {

      return;
    }


    // ---------------------------------------------------
    // START PROCESSING
    // ---------------------------------------------------

    this.processingPayment = true;


    // ---------------------------------------------------
    // TRANSACTION ID
    // ---------------------------------------------------

    const transactionId =
      'ACKTXN' + Date.now();


    // ---------------------------------------------------
    // PAYMENT DATA
    // ---------------------------------------------------

    const data = {

      requestid:
        this.requestid,


      /*
       * Logged-in Shop Owner
       */

      shopownerid:
        localStorage.getItem(
          'shopownerid'
        ),


      /*
       * Farmer
       */

      farmerid:
        this.paymentData.farmerid,


      /*
       * Product
       */

      productid:
        this.paymentData.productid,


      /*
       * Quantity
       */

      quantity:
        this.paymentData.quantity,


      /*
       * Price per unit
       */

      priceperunit:
        this.paymentData.offeredprice,


      /*
       * Total amount
       */

      totalamount:
        this.totalPrice,


      /*
       * 20% advance

       */

      advamount:
        this.advanceamount,


      /*
       * Transaction ID
       */

      transactionid:
        transactionId,


      /*
       * Payment method
       *
       * This is available to the backend if
       * you decide to store it later.
       */

      paymentmethod:
        this.selectedPaymentMethod

    };


    console.log(
      'Saving Shop Owner Payment:',
      data
    );


    // ---------------------------------------------------
    // SAVE PAYMENT
    // ---------------------------------------------------

    this.db.savePayment(data)

      .then((result: any) => {

        console.log(
          'Save Payment Response:',
          result
        );


        this.processingPayment = false;


        // ===============================================
        // SUCCESS
        // ===============================================

        if (
          result &&
          result.status === 'success'
        ) {


          /*
           * If backend returns a transaction ID,
           * use that transaction ID.
           *
           * Otherwise use the generated ID.
           */

          const finalTransactionId =
            result.transactionid ||
            transactionId;


          this.paymentStatus =
            'Paid';


          this.paymentData.transactionid =
            finalTransactionId;


          this.paymentData.paymentstatus =
            'Paid';


          alert(
            `Payment of ₹${this.advanceamount.toFixed(2)} completed successfully.`
          );


          console.log(
            'Payment Successful'
          );


          console.log(
            'Transaction ID:',
            finalTransactionId
          );


          // =============================================
          // REDIRECT TO SHOP OWNER RECEIPT
          // =============================================

          this.router.navigate(
            [
              '/shopownermaster/paymentreceipt',
              this.requestid
            ]
          )

          .then((success: boolean) => {

            console.log(
              'Receipt Navigation:',
              success
            );


            if (!success) {

              console.log(
                'Payment saved, but receipt navigation failed.'
              );

            }

          });

        }


        // ===============================================
        // FAILED
        // ===============================================

        else {

          alert(
            result?.message ||
            'Payment could not be completed.'
          );

        }

      })


      // =================================================
      // SERVER ERROR
      // =================================================

      .catch((error: any) => {

        console.log(
          'Save Payment Error:',
          error
        );


        this.processingPayment = false;


        alert(
          'Unable to process payment. Please try again.'
        );

      });

  }

}