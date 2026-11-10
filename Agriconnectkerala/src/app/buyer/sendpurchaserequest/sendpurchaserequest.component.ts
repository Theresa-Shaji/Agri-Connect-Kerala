import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-sendpurchaserequest',
  templateUrl: './sendpurchaserequest.component.html',
  styleUrls: ['./sendpurchaserequest.component.scss']
})
export class SendpurchaserequestComponent implements OnInit {

  productid: any;
  farmerid: any;
  buyerid: any;

  product: any = null;

  submitted: boolean = false;
  loading: boolean = false;

  errorMessage: string = '';

  request: any = {
    quantity: null,
    offeredprice: null,
    message: ''
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: DbserviceService
  ) {}


  ngOnInit(): void {

    this.buyerid = localStorage.getItem('buyerid');

    this.productid =
      this.route.snapshot.paramMap.get('productid');

    this.farmerid =
      this.route.snapshot.paramMap.get('farmerid');


    console.log('Buyer ID:', this.buyerid);
    console.log('Product ID:', this.productid);
    console.log('Farmer ID:', this.farmerid);


    if (!this.buyerid) {

      this.router.navigate(['/guestmaster/login']);

      return;
    }


    if (!this.productid) {

      this.errorMessage = 'Product details not found.';

      return;
    }


    this.loadProductDetails();
  }


  // ==========================================
  // LOAD PRODUCT DETAILS
  // ==========================================

  loadProductDetails(): void {

    const data = {
      productid: this.productid
    };


    this.db.sendRequestProductDetails(data)
      .then((result: any) => {

        console.log('Product Details:', result);


        if (result && result.length > 0) {

          this.product = result[0];

          // Initially set expected price
          this.request.offeredprice =
            this.product.expectedprice;

        }
        else {

          this.errorMessage =
            'Product details not found.';

        }

      })
      .catch((error: any) => {

        console.log(
          'Product Details Error:',
          error
        );

        this.errorMessage =
          'Unable to load product details.';

      });

  }


  // ==========================================
  // CALCULATE TOTAL
  // ==========================================

  getTotalAmount(): number {

    const quantity =
      Number(this.request.quantity) || 0;

    const price =
      Number(this.request.offeredprice) || 0;

    return quantity * price;
  }


  // ==========================================
  // SEND PURCHASE REQUEST
  // ==========================================

  sendRequest(): void {

    this.submitted = true;

    this.errorMessage = '';


    // Basic validation

    if (!this.request.quantity ||
        this.request.quantity <= 0) {

      return;
    }


    if (!this.request.offeredprice ||
        this.request.offeredprice <= 0) {

      return;
    }


    // Quantity cannot exceed available quantity

    if (
      Number(this.request.quantity) >
      Number(this.product.quantity)
    ) {

      return;
    }


    this.loading = true;


    const data = {

      buyerid: this.buyerid,

      usertype: 'Buyer',

      farmerid: this.product.farmerid,

      productid: this.product.productid,

      quantity: this.request.quantity,

      offeredprice: this.request.offeredprice,

      message: this.request.message || ''

    };


    console.log(
      'Purchase Request Data:',
      data
    );


    this.db.sendBuyerPurchaseRequest(data)
      .then((result: any) => {

        console.log(
          'Purchase Request Result:',
          result
        );


        this.loading = false;


        if (
          result &&
          result.status === 'success'
        ) {

          alert(
            'Purchase request sent successfully.'
          );


          this.router.navigate([
            '/buyermaster/buyerproductview'
          ]);

        }
        else {

          this.errorMessage =
            result.message ||
            'Unable to send purchase request.';

        }

      })
      .catch((error: any) => {

        console.log(
          'Purchase Request Error:',
          error
        );


        this.loading = false;


        if (
          error.error &&
          error.error.message
        ) {

          this.errorMessage =
            error.error.message;

        }
        else {

          this.errorMessage =
            'Unable to send purchase request.';

        }

      });

  }


  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/buyermaster/buyerproductdetails',
      this.productid
    ]);

  }

}