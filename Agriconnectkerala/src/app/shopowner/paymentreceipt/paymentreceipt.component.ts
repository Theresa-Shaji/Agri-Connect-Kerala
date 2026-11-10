import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-paymentreceipt',
  templateUrl: './paymentreceipt.component.html',
  styleUrls: ['./paymentreceipt.component.scss']
})
export class PaymentreceiptComponent implements OnInit {

  requestid: any;

  paymentData: any = {};

  totalPrice: number = 0;

  advanceamount: number = 0;

  remainingAmount: number = 0;


  constructor(
    private route: ActivatedRoute,
    private db: DbserviceService,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.requestid =
      this.route.snapshot.params['requestid'];

    console.log(
      "Receipt Request ID:",
      this.requestid
    );

    this.loadPaymentDetails();

  }


  loadPaymentDetails()
  {

    let data = {

      requestid: this.requestid

    };


    this.db.paymentDetails(data).then((result: any) => {

      console.log(
        "Receipt Payment Result:",
        result
      );


      if(result && result.length > 0)
      {

        this.paymentData = result[0];

        this.calculateTotal();

      }

    });

  }


  calculateTotal()
  {

    if(
      this.paymentData.quantity &&
      this.paymentData.offeredprice
    )
    {

      this.totalPrice =
        Number(this.paymentData.quantity) *
        Number(this.paymentData.offeredprice);


      this.advanceamount =
        Number(this.paymentData.advamount);


      this.remainingAmount =
        this.totalPrice -
        this.advanceamount;

    }

  }


  // ===============================
  // DOWNLOAD PAYMENT RECEIPT
  // ===============================

  downloadReceipt()
  {

    const doc = new jsPDF();


    // Title

    doc.setFontSize(20);

    doc.text(
      'Agri Connect Kerala',
      105,
      25,
      { align: 'center' }
    );


    doc.setFontSize(11);

    doc.text(
      'Agricultural Market Price Information and Farmer Marketplace System',
      105,
      33,
      { align: 'center' }
    );


    // Line

    doc.line(
      20,
      40,
      190,
      40
    );


    // Payment Successful

    doc.setFontSize(16);

    doc.text(
      'Payment Successful',
      105,
      55,
      { align: 'center' }
    );


    doc.setFontSize(11);


    // Product Details

    doc.text(
      'Product Details',
      20,
      70
    );

    doc.line(
      20,
      73,
      190,
      73
    );


    doc.text(
      'Product:',
      25,
      85
    );

    doc.text(
      String(this.paymentData.productname || ''),
      100,
      85
    );


    doc.text(
      'Farmer:',
      25,
      95
    );

    doc.text(
      String(this.paymentData.farmername || ''),
      100,
      95
    );


    doc.text(
      'Quantity:',
      25,
      105
    );

    doc.text(
      String(
        this.paymentData.quantity || ''
      ) + ' ' +
      String(
        this.paymentData.unit || ''
      ),
      100,
      105
    );


    // Payment Details

    doc.text(
      'Payment Details',
      20,
      125
    );

    doc.line(
      20,
      128,
      190,
      128
    );


    doc.text(
      'Total Amount:',
      25,
      140
    );

    doc.text(
      'Rs. ' +
      this.totalPrice.toFixed(2),
      100,
      140
    );


    doc.text(
      'Advance Paid:',
      25,
      150
    );

    doc.text(
      'Rs. ' +
      this.advanceamount.toFixed(2),
      100,
      150
    );


    doc.text(
      'Remaining Amount:',
      25,
      160
    );

    doc.text(
      'Rs. ' +
      this.remainingAmount.toFixed(2),
      100,
      160
    );


    doc.text(
      'Transaction ID:',
      25,
      170
    );

    doc.text(
      String(
        this.paymentData.transactionid || ''
      ),
      100,
      170
    );


    doc.text(
      'Payment Date:',
      25,
      180
    );

    doc.text(
      String(
        this.paymentData.paymentdate || ''
      ),
      100,
      180
    );


    doc.text(
      'Payment Status:',
      25,
      190
    );

    doc.text(
      String(
        this.paymentData.paymentstatus || ''
      ),
      100,
      190
    );


    // Footer

    doc.line(
      20,
      205,
      190,
      205
    );


    doc.setFontSize(10);

    doc.text(
      'Thank you for using Agri Connect Kerala.',
      105,
      220,
      { align: 'center' }
    );


    // Download

    doc.save(
      'AgriConnect_Payment_Receipt_' +
      this.requestid +
      '.pdf'
    );

  }


  // ===============================
  // BACK TO SENT REQUESTS
  // ===============================

  backToRequests()
  {

    this.router.navigate([
      '/shopownermaster/viewsentrequest'
    ]);

  }

}