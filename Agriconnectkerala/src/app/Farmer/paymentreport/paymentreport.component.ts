import { Component, OnInit } from '@angular/core';
import { DbserviceService } from '../../dbservice.service';

@Component({
  selector: 'app-paymentreport',
  templateUrl: './paymentreport.component.html',
  styleUrls: ['./paymentreport.component.scss']
})
export class PaymentreportComponent implements OnInit {

  paymentArray: any[] = [];
  filteredPaymentArray: any[] = [];

  farmerid: any;

  fromdate: string = '';
  todate: string = '';

  selectedPaymentStatus: string = 'All';
  selectedBuyerType: string = 'All';

  loading: boolean = false;

  totalPayments: number = 0;
  paidPayments: number = 0;
  pendingPayments: number = 0;

  totalAdvance: number = 0;
  totalAmount: number = 0;


  constructor(private db: DbserviceService) {}


  ngOnInit(): void {

    this.farmerid = localStorage.getItem('farmerid');

    console.log('=================================');
    console.log('FARMER PAYMENT REPORT');
    console.log('Farmer ID:', this.farmerid);
    console.log('=================================');

    if (this.farmerid) {

      this.getPaymentReport();

    } else {

      console.error('Farmer ID not found in localStorage');

      alert('Farmer ID not found. Please login again.');

    }

  }


  // =====================================================
  // GET PAYMENT REPORT
  // =====================================================

  getPaymentReport(): void {

    if (!this.farmerid) {

      alert('Farmer ID not found.');

      return;

    }


    this.loading = true;


    const data = {

      farmerid: this.farmerid

    };


    console.log(
      'Sending Payment Report Request:',
      data
    );


    this.db.paymentreport(data).subscribe({

      next: (result: any) => {

        console.log(
          'Payment Report Backend Response:',
          result
        );


        this.loading = false;


        // ==========================================
        // RESPONSE IS DIRECT ARRAY
        // ==========================================

        if (Array.isArray(result)) {

          this.paymentArray = result;

        }


        // ==========================================
        // RESPONSE IS { data: [] }
        // ==========================================

        else if (
          result &&
          Array.isArray(result.data)
        ) {

          this.paymentArray = result.data;

        }


        // ==========================================
        // NO DATA
        // ==========================================

        else {

          this.paymentArray = [];

        }


        console.log(
          'Payment Array:',
          this.paymentArray
        );

        console.log(
          'Payment Count:',
          this.paymentArray.length
        );


        this.applyFilter();

      },


      error: (error: any) => {

        console.error(
          'Payment Report HTTP Error:',
          error
        );


        this.loading = false;

        this.paymentArray = [];

        this.filteredPaymentArray = [];

        this.calculateSummary();

      }

    });

  }


  // =====================================================
  // FILTER
  // =====================================================

  applyFilter(): void {

    this.filteredPaymentArray =
      this.paymentArray.filter((item: any) => {


        let validDate = true;

        let validStatus = true;

        let validBuyerType = true;


        // ==========================================
        // DATE FILTER
        // ==========================================

        if (
          this.fromdate ||
          this.todate
        ) {

          const paymentDate =
            new Date(item.paymentdate);


          if (
            isNaN(paymentDate.getTime())
          ) {

            validDate = false;

          }
          else {

            paymentDate.setHours(
              0,
              0,
              0,
              0
            );


            if (this.fromdate) {

              const fromDate =
                new Date(this.fromdate);

              fromDate.setHours(
                0,
                0,
                0,
                0
              );


              if (
                paymentDate < fromDate
              ) {

                validDate = false;

              }

            }


            if (this.todate) {

              const toDate =
                new Date(this.todate);

              toDate.setHours(
                23,
                59,
                59,
                999
              );


              if (
                paymentDate > toDate
              ) {

                validDate = false;

              }

            }

          }

        }


        // ==========================================
        // PAYMENT STATUS FILTER
        // ==========================================

        if (
          this.selectedPaymentStatus !== 'All'
        ) {

          const status =
            String(
              item.paymentstatus || ''
            )
            .trim()
            .toLowerCase();


          validStatus =
            status ===
            String(
              this.selectedPaymentStatus
            )
            .trim()
            .toLowerCase();

        }


        // ==========================================
        // BUYER TYPE FILTER
        // ==========================================

        if (
          this.selectedBuyerType !== 'All'
        ) {

          const buyerType =
            String(
              item.buyertype || ''
            )
            .trim()
            .toLowerCase();


          validBuyerType =
            buyerType ===
            String(
              this.selectedBuyerType
            )
            .trim()
            .toLowerCase();

        }


        return (
          validDate &&
          validStatus &&
          validBuyerType
        );

      });


    this.calculateSummary();

  }


  // =====================================================
  // SUMMARY
  // =====================================================

  calculateSummary(): void {

    this.totalPayments =
      this.filteredPaymentArray.length;


    this.paidPayments = 0;

    this.pendingPayments = 0;

    this.totalAdvance = 0;

    this.totalAmount = 0;


    this.filteredPaymentArray.forEach(
      (item: any) => {


        // ==========================================
        // ADVANCE
        // ==========================================

        this.totalAdvance +=
          Number(
            item.advamount
          ) || 0;


        // ==========================================
        // TOTAL PURCHASE AMOUNT
        // ==========================================

        this.totalAmount +=
          Number(
            item.totalamount
          ) || 0;


        // ==========================================
        // PAYMENT STATUS
        // ==========================================

        const status =
          String(
            item.paymentstatus || ''
          )
          .trim()
          .toLowerCase();


        if (
          status === 'paid'
        ) {

          this.paidPayments++;

        }


        if (
          status === 'pending'
        ) {

          this.pendingPayments++;

        }

      }
    );


    console.log(
      'Total Payments:',
      this.totalPayments
    );

    console.log(
      'Paid Payments:',
      this.paidPayments
    );

    console.log(
      'Pending Payments:',
      this.pendingPayments
    );

    console.log(
      'Total Advance:',
      this.totalAdvance
    );

    console.log(
      'Total Amount:',
      this.totalAmount
    );

  }


  // =====================================================
  // CLEAR FILTER
  // =====================================================

  clearFilter(): void {

    this.fromdate = '';

    this.todate = '';

    this.selectedPaymentStatus = 'All';

    this.selectedBuyerType = 'All';

    this.applyFilter();

  }


  // =====================================================
  // PRINT
  // =====================================================

  printReport(): void {

    window.print();

  }


  // =====================================================
  // PAYMENT STATUS CLASS
  // =====================================================

  getPaymentStatusClass(
    status: any
  ): string {

    const value =
      String(status || '')
      .trim()
      .toLowerCase();


    if (
      value === 'paid'
    ) {

      return 'paid';

    }


    if (
      value === 'failed' ||
      value === 'rejected'
    ) {

      return 'failed';

    }


    return 'pending';

  }


  // =====================================================
  // BUYER TYPE CLASS
  // =====================================================

  getBuyerTypeClass(
    type: any
  ): string {

    const value =
      String(type || '')
      .trim()
      .toLowerCase();


    if (
      value === 'buyer'
    ) {

      return 'buyer';

    }


    return 'shop-owner';

  }

}