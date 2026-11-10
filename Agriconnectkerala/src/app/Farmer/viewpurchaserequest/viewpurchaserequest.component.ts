import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-viewpurchaserequest',
  templateUrl: './viewpurchaserequest.component.html',
  styleUrls: ['./viewpurchaserequest.component.scss']
})
export class ViewpurchaserequestComponent implements OnInit {

  requestArray: any[] = [];

  pendingCount = 0;
  acceptedCount = 0;
  rejectedCount = 0;

  constructor(private db: DbserviceService) {}

  ngOnInit(): void {

    this.loadRequests();

  }


  loadRequests(): void {

    const data = {

      farmerid: localStorage.getItem('farmerid')

    };


    this.db.viewPurchaseRequest(data).then((result: any) => {

      console.log("Farmer Purchase Requests:", result);


      if (!result || result.status === "failed") {

        this.requestArray = [];

        return;

      }


      this.requestArray = result;


      this.pendingCount = 0;
      this.acceptedCount = 0;
      this.rejectedCount = 0;


      this.requestArray.forEach((r: any) => {

        r.expectedprice = Number(r.expectedprice || 0);

        r.offeredprice = Number(r.offeredprice || 0);

        r.availablequantity =
          Number(r.availablequantity || 0);

        r.requestquantity =
          Number(r.requestquantity || 0);


        // Total purchase amount

        r.totalvalue =
          r.offeredprice * r.requestquantity;


        // Difference between offer and expected price

        r.priceDifference =
          r.offeredprice - r.expectedprice;


        // Status count

        if (r.status === "Pending") {

          this.pendingCount++;

        }

        else if (r.status === "Accepted") {

          this.acceptedCount++;

        }

        else if (r.status === "Rejected") {

          this.rejectedCount++;

        }

      });

    })

    .catch((error: any) => {

      console.log(
        "Purchase Request View Error:",
        error
      );

      this.requestArray = [];

    });

  }


  // =====================================================
  // ACCEPT REQUEST
  // =====================================================

  acceptRequest(requestid: any): void {

    if (
      confirm(
        "Are you sure you want to accept this purchase request?"
      )
    ) {

      const data = {

        requestid: requestid

      };


      this.db.acceptPurchaseRequest(data)
        .then((result: any) => {

          if (result.status === "success") {

            alert(
              "Purchase Request Accepted Successfully"
            );

            this.loadRequests();

          }

          else {

            alert(
              "Unable to accept purchase request."
            );

          }

        })

        .catch((error: any) => {

          console.log(
            "Accept Request Error:",
            error
          );

          alert(
            "Something went wrong."
          );

        });

    }

  }


  // =====================================================
  // REJECT REQUEST
  // =====================================================

  rejectRequest(requestid: any): void {

    if (
      confirm(
        "Are you sure you want to reject this purchase request?"
      )
    ) {

      const data = {

        requestid: requestid

      };


      this.db.rejectPurchaseRequest(data)
        .then((result: any) => {

          if (result.status === "success") {

            alert(
              "Purchase Request Rejected"
            );

            this.loadRequests();

          }

          else {

            alert(
              "Unable to reject purchase request."
            );

          }

        })

        .catch((error: any) => {

          console.log(
            "Reject Request Error:",
            error
          );

          alert(
            "Something went wrong."
          );

        });

    }

  }

}