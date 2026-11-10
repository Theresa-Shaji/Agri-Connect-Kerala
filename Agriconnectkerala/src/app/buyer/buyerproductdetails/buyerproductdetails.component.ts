import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-buyerproductdetails',
  templateUrl: './buyerproductdetails.component.html',
  styleUrls: ['./buyerproductdetails.component.scss']
})
export class BuyerproductdetailsComponent implements OnInit {

  // ==========================================
  // PRODUCT DETAILS
  // ==========================================

  product: any = null;

  productid: any;

  buyerid: any;


  // ==========================================
  // FEEDBACK
  // ==========================================

  feedbackArray: any[] = [];

  feedbackLoading: boolean = false;

  feedbackError: string = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: DbserviceService
  ) {}


  // ==========================================
  // PAGE LOAD
  // ==========================================

  ngOnInit(): void {

    this.buyerid =
      localStorage.getItem('buyerid');


    this.productid =
      this.route.snapshot.paramMap.get('productid');


    console.log(
      'Product ID:',
      this.productid
    );


    if (!this.productid) {

      console.log(
        'Product ID not found.'
      );

      return;

    }


    // Load product details

    this.loadProductDetails();


    // Load customer feedback

    this.loadProductFeedback();

  }


  // ==========================================
  // LOAD PRODUCT DETAILS
  // ==========================================

  loadProductDetails(): void {

    const data = {

      productid: this.productid

    };


    this.db.getBuyerProductDetails(data)

      .then((result: any) => {

        console.log(
          'Product Details:',
          result
        );


        if (
          result &&
          result.length > 0
        ) {

          this.product =
            result[0];

        }
        else {

          this.product =
            null;

        }

      })

      .catch((error: any) => {

        console.log(
          'Product Details Error:',
          error
        );

        this.product =
          null;

      });

  }


  // ==========================================
  // LOAD PRODUCT FEEDBACK
  // ==========================================

  loadProductFeedback(): void {

    this.feedbackLoading =
      true;

    this.feedbackError =
      '';


    const data = {

      productid:
        this.productid

    };


    console.log(
      'Product Feedback Request:',
      data
    );


    this.db.getProductFeedback(data)

      .then((result: any) => {

        console.log(
          'Product Feedback Result:',
          result
        );


        this.feedbackLoading =
          false;


        if (
          result &&
          result.status === 'success'
        ) {

          this.feedbackArray =
            result.data || [];


          console.log(
            'Feedback Array:',
            this.feedbackArray
          );

        }
        else {

          this.feedbackArray =
            [];


          this.feedbackError =
            result?.message ||
            'Unable to load customer feedback.';

        }

      })

      .catch((error: any) => {

        console.log(
          'Product Feedback Error:',
          error
        );


        this.feedbackLoading =
          false;


        this.feedbackArray =
          [];


        this.feedbackError =
          'Unable to load customer feedback.';

      });

  }


  // ==========================================
  // GO BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/buyermaster/buyerproductview'
    ]);

  }


  // ==========================================
  // SEND PURCHASE REQUEST
  // ==========================================

  sendPurchaseRequest(): void {

    console.log(
      'Send Purchase Request clicked'
    );


    console.log(
      'Product ID:',
      this.productid
    );


    this.router.navigate([
      '/buyermaster/sendpurchaserequest',
      this.productid
    ]);

  }

}