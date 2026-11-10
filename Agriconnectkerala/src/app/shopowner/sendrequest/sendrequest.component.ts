import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-sendrequest',
  templateUrl: './sendrequest.component.html',
  styleUrls: ['./sendrequest.component.scss']
})
export class SendrequestComponent implements OnInit {

  productid: any;
  farmerid: any;

  quantity: any;
  offeredprice: any;
  message: any;


  constructor(
    private route: ActivatedRoute,
    private db: DbserviceService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.productid =
      this.route.snapshot.params['productid'];

    this.farmerid =
      this.route.snapshot.params['farmerid'];


    console.log(
      "Product ID:",
      this.productid
    );

    console.log(
      "Farmer ID:",
      this.farmerid
    );

  }


  // =====================================================
  // SUBMIT PURCHASE REQUEST
  // =====================================================

  submitRequest(): void {

    // Validate quantity

    if (!this.quantity || this.quantity <= 0) {

      alert("Please enter a valid quantity.");

      return;

    }


    // Validate offered price

    if (!this.offeredprice || this.offeredprice <= 0) {

      alert("Please enter a valid offered price.");

      return;

    }


    // Validate message

    if (!this.message || this.message.trim() === '') {

      alert("Please enter a message to the farmer.");

      return;

    }


    // Get Shop Owner ID

    let shopownerid =
      localStorage.getItem("shopownerid");


    if (!shopownerid) {

      alert(
        "Shop Owner ID not found. Please login again."
      );

      return;

    }


    // =====================================================
    // REQUEST DATA
    // =====================================================

    let data = {

      buyerid: shopownerid,

      usertype: "ShopOwner",

      productid: this.productid,

      farmerid: this.farmerid,

      quantity: this.quantity,

      offeredprice: this.offeredprice,

      message: this.message.trim()

    };


    console.log(
      "Purchase Request Data:",
      data
    );


    // =====================================================
    // SEND REQUEST
    // =====================================================

    this.db
      .sendPurchaseRequest(data)
      .then((result: any) => {

        console.log(
          "Purchase Request Result:",
          result
        );


        if (
          result &&
          result.status === "success"
        ) {

          alert(
            "Purchase Request Sent Successfully"
          );


          // =================================================
          // REDIRECT TO VIEW SENT REQUEST
          // =================================================

          this.router.navigate([
            '/shopownermaster/viewsentrequest'
          ]);

        }
        else {

          alert(
            result?.message ||
            "Request Failed"
          );

        }

      })
      .catch((error: any) => {

        console.error(
          "Purchase Request Error:",
          error
        );

        alert(
          "Something went wrong while sending the request."
        );

      });

  }

}