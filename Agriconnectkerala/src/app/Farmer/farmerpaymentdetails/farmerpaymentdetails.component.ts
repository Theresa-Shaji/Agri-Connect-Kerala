import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-farmerpaymentdetails',
  templateUrl: './farmerpaymentdetails.component.html',
  styleUrls: ['./farmerpaymentdetails.component.scss']
})
export class FarmerpaymentdetailsComponent implements OnInit {

  paymentArray: any[] = [];

  constructor(
    private db: DbserviceService
  ) { }

  ngOnInit(): void {

    this.loadPayments();

  }


  // =====================================
  // LOAD FARMER PAYMENTS
  // =====================================

  loadPayments(): void {

    const data = {

      farmerid:
        localStorage.getItem('farmerid')

    };

    console.log(
      'Farmer ID:',
      data.farmerid
    );


    this.db.farmerPaymentDetails(data)

      .then((result: any) => {

        console.log(
          'Farmer Payment Result:',
          result
        );


        if (Array.isArray(result)) {

          this.paymentArray = result;

        }
        else {

          this.paymentArray = [];

        }


        // =====================================
        // CALCULATE TOTAL AND REMAINING AMOUNT
        // =====================================

        this.paymentArray.forEach((p: any) => {

          p.requestquantity =
            Number(p.requestquantity || 0);

          p.offeredprice =
            Number(p.offeredprice || 0);

          p.advamount =
            Number(p.advamount || 0);


          // Total Purchase Amount

          p.totalamount =
            p.requestquantity *
            p.offeredprice;


          // Remaining Amount

          p.remainingamount =
            p.totalamount -
            p.advamount;


          // Make sure payment type exists

          if (!p.paymenttype) {

            p.paymenttype = 'Shop Owner';

          }

        });


        console.log(
          'Final Payment Array:',
          this.paymentArray
        );

      })

      .catch((error: any) => {

        console.log(
          'Payment Loading Error:',
          error
        );

        this.paymentArray = [];

      });

  }

}