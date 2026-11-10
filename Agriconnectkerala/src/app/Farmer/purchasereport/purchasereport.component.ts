import { Component, OnInit } from '@angular/core';
import { DbserviceService } from '../../dbservice.service';

@Component({
  selector: 'app-purchasereport',
  templateUrl: './purchasereport.component.html',
  styleUrls: ['./purchasereport.component.scss']
})
export class PurchasereportComponent implements OnInit {

  purchaseArray: any[] = [];
  filteredPurchaseArray: any[] = [];

  farmerid: any;

  fromdate: string = '';
  todate: string = '';

  selectedStatus: string = 'All';
  selectedBuyerType: string = 'All';

  loading: boolean = false;

  totalRequests: number = 0;
  acceptedRequests: number = 0;
  totalQuantity: number = 0;
  totalAmount: number = 0;


  constructor(private db: DbserviceService) {}


  ngOnInit(): void {

    this.farmerid = localStorage.getItem('farmerid');

    console.log('Farmer ID:', this.farmerid);

    if (this.farmerid) {
      this.getPurchaseReport();
    }

  }


  // =====================================================
  // GET PURCHASE REPORT
  // =====================================================

  getPurchaseReport(): void {

    if (!this.farmerid) {

      alert('Farmer ID not found.');
      return;

    }

    this.loading = true;

    const data = {
      farmerid: this.farmerid
    };

    console.log('Sending:', data);


    this.db.purchasereport(data).subscribe({

      next: (result: any) => {

        console.log('Purchase Report:', result);

        this.loading = false;


        if (Array.isArray(result)) {

          this.purchaseArray = result;

        }
        else if (result && Array.isArray(result.data)) {

          this.purchaseArray = result.data;

        }
        else {

          this.purchaseArray = [];

        }


        this.applyFilter();

      },


      error: (error: any) => {

        console.error('Purchase Report Error:', error);

        this.loading = false;

        this.purchaseArray = [];
        this.filteredPurchaseArray = [];

        this.calculateSummary();

      }

    });

  }


  // =====================================================
  // FILTER
  // =====================================================

  applyFilter(): void {

    this.filteredPurchaseArray =
      this.purchaseArray.filter((item: any) => {


        let validDate = true;
        let validStatus = true;
        let validBuyerType = true;


        // -----------------------------------------------
        // DATE FILTER
        // -----------------------------------------------

        if (this.fromdate || this.todate) {

          const requestDate =
            new Date(item.requestdate);

          requestDate.setHours(0, 0, 0, 0);


          if (this.fromdate) {

            const fromDate =
              new Date(this.fromdate);

            fromDate.setHours(0, 0, 0, 0);


            if (requestDate < fromDate) {

              validDate = false;

            }

          }


          if (this.todate) {

            const toDate =
              new Date(this.todate);

            toDate.setHours(23, 59, 59, 999);


            if (requestDate > toDate) {

              validDate = false;

            }

          }

        }


        // -----------------------------------------------
        // STATUS FILTER
        // -----------------------------------------------

        if (this.selectedStatus !== 'All') {

          const status =
            String(item.status || '')
              .trim()
              .toLowerCase();


          validStatus =
            status ===
            this.selectedStatus
              .trim()
              .toLowerCase();

        }


        // -----------------------------------------------
        // BUYER TYPE FILTER
        // -----------------------------------------------

        if (this.selectedBuyerType !== 'All') {

          const buyerType =
            String(item.buyertype || '')
              .trim()
              .toLowerCase();


          validBuyerType =
            buyerType ===
            this.selectedBuyerType
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

    this.totalRequests =
      this.filteredPurchaseArray.length;

    this.acceptedRequests = 0;

    this.totalQuantity = 0;

    this.totalAmount = 0;


    this.filteredPurchaseArray.forEach(
      (item: any) => {


        // QUANTITY

        this.totalQuantity +=
          Number(item.quantity) || 0;


        // TOTAL AMOUNT

        this.totalAmount +=
          Number(item.totalamount) || 0;


        // STATUS

        const status =
          String(item.status || '')
            .trim()
            .toLowerCase();


        if (
          status === 'accepted' ||
          status === 'approved'
        ) {

          this.acceptedRequests++;

        }

      }
    );

  }


  // =====================================================
  // CLEAR FILTER
  // =====================================================

  clearFilter(): void {

    this.fromdate = '';

    this.todate = '';

    this.selectedStatus = 'All';

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
  // STATUS CLASS
  // =====================================================

  getStatusClass(status: any): string {

    const value =
      String(status || '')
        .trim()
        .toLowerCase();


    if (
      value === 'accepted' ||
      value === 'approved'
    ) {

      return 'accepted';

    }


    if (value === 'rejected') {

      return 'rejected';

    }


    return 'pending';

  }

}