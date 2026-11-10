import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  requestid: any = '';

  transactionid: any = '';

  farmername: any = '';

  productname: any = '';

  quantity: number = 0;

  unit: any = '';

  priceperunit: number = 0;

  totalamount: number = 0;

  advamount: number = 0;

  remainingAmount: number = 0;

  currentDate: Date = new Date();


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      this.requestid =
        params['requestid'] || '';


      this.transactionid =
        params['transactionid'] || '';


      this.farmername =
        params['farmername'] || '';


      this.productname =
        params['productname'] || '';


      this.quantity =
        Number(
          params['quantity'] || 0
        );


      this.unit =
        params['unit'] || '';


      this.priceperunit =
        Number(
          params['priceperunit'] || 0
        );


      this.totalamount =
        Number(
          params['totalamount'] || 0
        );


      this.advamount =
        Number(
          params['advamount'] || 0
        );


      // =================================================
      // REMAINING AMOUNT
      // =================================================

      this.remainingAmount =
        this.totalamount -
        this.advamount;


      console.log(
        '========================================'
      );

      console.log(
        'PAYMENT SUCCESS PAGE'
      );

      console.log(
        'Request ID:',
        this.requestid
      );

      console.log(
        'Transaction ID:',
        this.transactionid
      );

      console.log(
        'Farmer:',
        this.farmername
      );

      console.log(
        'Product:',
        this.productname
      );

      console.log(
        'Quantity:',
        this.quantity
      );

      console.log(
        'Unit:',
        this.unit
      );

      console.log(
        'Price Per Unit:',
        this.priceperunit
      );

      console.log(
        'Total Amount:',
        this.totalamount
      );

      console.log(
        'Advance Amount:',
        this.advamount
      );

      console.log(
        'Remaining Amount:',
        this.remainingAmount
      );

      console.log(
        '========================================'
      );

    });

  }


  // =====================================================
  // BACK TO SENT REQUESTS
  // =====================================================

  goBack(): void {

    this.router.navigate([
      '/buyermaster/buyerviewpurchaserequest'
    ]);

  }


  // =====================================================
  // DOWNLOAD PAYMENT RECEIPT
  // =====================================================

  downloadReceipt(): void {

    const pdf = new jsPDF();


    // =====================================================
    // HEADER
    // =====================================================

    pdf.setFillColor(
      31,
      114,
      53
    );

    pdf.rect(
      0,
      0,
      210,
      40,
      'F'
    );


    pdf.setTextColor(
      255,
      255,
      255
    );

    pdf.setFont(
      'helvetica',
      'bold'
    );

    pdf.setFontSize(21);

    pdf.text(
      'AGRI CONNECT KERALA',
      105,
      17,
      {
        align: 'center'
      }
    );


    pdf.setFont(
      'helvetica',
      'normal'
    );

    pdf.setFontSize(11);

    pdf.text(
      'Advance Payment Receipt',
      105,
      28,
      {
        align: 'center'
      }
    );


    // =====================================================
    // PAYMENT SUCCESS
    // =====================================================

    pdf.setTextColor(
      35,
      117,
      58
    );

    pdf.setFont(
      'helvetica',
      'bold'
    );

    pdf.setFontSize(19);

    pdf.text(
      'PAYMENT SUCCESSFUL',
      105,
      62,
      {
        align: 'center'
      }
    );


    pdf.setTextColor(
      100,
      100,
      100
    );

    pdf.setFont(
      'helvetica',
      'normal'
    );

    pdf.setFontSize(10);

    pdf.text(
      'Advance payment has been completed successfully.',
      105,
      71,
      {
        align: 'center'
      }
    );


    // =====================================================
    // PAID TO FARMER
    // =====================================================

    pdf.setFillColor(
      240,
      248,
      242
    );

    pdf.roundedRect(
      20,
      84,
      170,
      27,
      4,
      4,
      'F'
    );


    pdf.setTextColor(
      100,
      110,
      103
    );

    pdf.setFont(
      'helvetica',
      'bold'
    );

    pdf.setFontSize(9);

    pdf.text(
      'PAID TO FARMER',
      30,
      94
    );


    pdf.setTextColor(
      35,
      80,
      40
    );

    pdf.setFontSize(15);

    pdf.text(
      this.farmername || 'Farmer',
      30,
      104
    );


    // =====================================================
    // ADVANCE AMOUNT
    // =====================================================

    pdf.setTextColor(
      60,
      60,
      60
    );

    pdf.setFont(
      'helvetica',
      'normal'
    );

    pdf.setFontSize(10);

    pdf.text(
      'ADVANCE AMOUNT PAID',
      105,
      128,
      {
        align: 'center'
      }
    );


    pdf.setTextColor(
      35,
      125,
      58
    );

    pdf.setFont(
      'helvetica',
      'bold'
    );

    pdf.setFontSize(25);

    pdf.text(
      `Rs. ${this.advamount.toFixed(2)}`,
      105,
      141,
      {
        align: 'center'
      }
    );


    // =====================================================
    // ADVANCE LABEL
    // =====================================================

    pdf.setFillColor(
      230,
      244,
      233
    );

    pdf.roundedRect(
      78,
      147,
      54,
      9,
      4,
      4,
      'F'
    );


    pdf.setTextColor(
      45,
      110,
      60
    );

    pdf.setFont(
      'helvetica',
      'normal'
    );

    pdf.setFontSize(8);

    pdf.text(
      '20% Advance Payment',
      105,
      153,
      {
        align: 'center'
      }
    );


    // =====================================================
    // PAYMENT DETAILS
    // =====================================================

    pdf.setTextColor(
      45,
      55,
      48
    );

    pdf.setFont(
      'helvetica',
      'bold'
    );

    pdf.setFontSize(12);

    pdf.text(
      'Payment Details',
      20,
      174
    );


    pdf.setDrawColor(
      220,
      230,
      222
    );

    pdf.line(
      20,
      178,
      190,
      178
    );


    // =====================================================
    // PAYMENT ROWS
    // =====================================================

    let y = 189;


    const addRow = (
      label: string,
      value: string
    ) => {

      pdf.setFont(
        'helvetica',
        'normal'
      );

      pdf.setFontSize(9);

      pdf.setTextColor(
        110,
        110,
        110
      );

      pdf.text(
        label,
        25,
        y
      );


      pdf.setFont(
        'helvetica',
        'bold'
      );

      pdf.setTextColor(
        45,
        50,
        46
      );

      pdf.text(
        value,
        185,
        y,
        {
          align: 'right'
        }
      );


      y += 10;

    };


    addRow(
      'Request ID',
      this.requestid || '-'
    );


    addRow(
      'Farmer',
      this.farmername || '-'
    );


    addRow(
      'Product',
      this.productname || '-'
    );


    addRow(
      'Quantity',
      `${this.quantity} ${this.unit || ''}`
    );


    addRow(
      `Price per ${this.unit || 'unit'}`,
      `Rs. ${this.priceperunit.toFixed(2)}`
    );


    addRow(
      'Total Purchase Amount',
      `Rs. ${this.totalamount.toFixed(2)}`
    );


    addRow(
      'Advance Paid',
      `Rs. ${this.advamount.toFixed(2)}`
    );


    addRow(
      'Remaining Amount',
      `Rs. ${this.remainingAmount.toFixed(2)}`
    );


    addRow(
      'Payment Status',
      'PAID'
    );


    addRow(
      'Transaction ID',
      this.transactionid || '-'
    );


    addRow(
      'Payment Date',
      this.currentDate.toLocaleDateString('en-IN')
    );


    // =====================================================
    // FOOTER
    // =====================================================

    pdf.setFillColor(
      248,
      250,
      248
    );

    pdf.rect(
      0,
      260,
      210,
      37,
      'F'
    );


    pdf.setTextColor(
      46,
      125,
      50
    );

    pdf.setFont(
      'helvetica',
      'bold'
    );

    pdf.setFontSize(10);

    pdf.text(
      'Thank you for using Agri Connect Kerala',
      105,
      274,
      {
        align: 'center'
      }
    );


    pdf.setTextColor(
      110,
      110,
      110
    );

    pdf.setFont(
      'helvetica',
      'normal'
    );

    pdf.setFontSize(8);

    pdf.text(
      'Please keep this receipt for future reference.',
      105,
      283,
      {
        align: 'center'
      }
    );


    // =====================================================
    // SAVE PDF
    // =====================================================

    const fileName =
      `ACK-Payment-Receipt-${this.transactionid || 'Payment'}.pdf`;


    pdf.save(fileName);

  }

}