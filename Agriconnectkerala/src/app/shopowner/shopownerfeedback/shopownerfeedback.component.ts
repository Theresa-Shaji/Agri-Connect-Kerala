import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-shopownerfeedback',
  templateUrl: './shopownerfeedback.component.html',
  styleUrls: ['./shopownerfeedback.component.scss']
})
export class ShopownerfeedbackComponent implements OnInit {

  feedbackRequests: any[] = [];

  shopownerid: any;

  loading: boolean = true;

  errorMessage: string = '';

  constructor(
    private db: DbserviceService
  ) {}

  ngOnInit(): void {

    console.log('================================');
    console.log('SHOP OWNER FEEDBACK PAGE');
    console.log('================================');

    this.shopownerid =
      localStorage.getItem('shopownerid');

    console.log(
      'Shop Owner ID:',
      this.shopownerid
    );


    if (!this.shopownerid) {

      this.loading = false;

      this.errorMessage =
        'Shop Owner ID not found. Please login again.';

      return;
    }


    this.loadFeedbackRequests();

  }


  // =====================================================
  // LOAD SHOP OWNER FEEDBACK REQUESTS
  // =====================================================

  loadFeedbackRequests(): void {

    this.loading = true;

    this.errorMessage = '';


    const data = {

      shopownerid:
        Number(this.shopownerid)

    };


    console.log(
      'Sending Shop Owner Feedback Request:',
      data
    );


    this.db
      .getShopownerFeedbackRequests(data)

      .then((result: any) => {

        console.log(
          'Shop Owner Feedback Response:',
          result
        );


        this.loading = false;


        if (
          result &&
          result.status === 'success'
        ) {

          this.feedbackRequests =
            result.data || [];


          console.log(
            'Shop Owner Feedback Requests:',
            this.feedbackRequests
          );


          if (
            this.feedbackRequests.length === 0
          ) {

            console.log(
              'No paid Shop Owner purchases waiting for feedback.'
            );

          }

        }
        else {

          this.feedbackRequests = [];

          this.errorMessage =
            result?.message ||
            'Unable to load feedback requests.';

        }

      })

      .catch((error: any) => {

        console.log(
          'SHOP OWNER FEEDBACK ERROR:',
          error
        );


        this.loading = false;

        this.feedbackRequests = [];


        if (error?.error?.message) {

          this.errorMessage =
            error.error.message;

        }
        else {

          this.errorMessage =
            'Unable to load feedback requests. Please check the backend server.';

        }

      });

  }


  // =====================================================
  // SUBMIT SHOP OWNER FEEDBACK
  // =====================================================

  submitFeedback(request: any): void {


    console.log(
      'Submitting Shop Owner Feedback:',
      request
    );


    // RATING

    if (
      !request.rating ||
      Number(request.rating) < 1 ||
      Number(request.rating) > 5
    ) {

      alert(
        'Please select a rating from 1 to 5.'
      );

      return;

    }


    // FEEDBACK

    if (
      !request.feedback ||
      request.feedback.trim() === ''
    ) {

      alert(
        'Please enter your feedback.'
      );

      return;

    }


    const data = {

      requestid:
        Number(request.requestid),

      shopownerid:
        Number(this.shopownerid),

      farmerid:
        Number(request.farmerid),

      productid:
        Number(request.productid),

      rating:
        Number(request.rating),

      feedback:
        request.feedback.trim()

    };


    console.log(
      'Shop Owner Feedback Data:',
      data
    );


    this.db
      .saveShopownerFeedback(data)

      .then((result: any) => {


        console.log(
          'Save Shop Owner Feedback Response:',
          result
        );


        if (
          result &&
          result.status === 'success'
        ) {

          alert(
            'Feedback submitted successfully.'
          );


          this.feedbackRequests =
            this.feedbackRequests.filter(

              (item: any) =>
                Number(item.requestid) !==
                Number(request.requestid)

            );

        }
        else {

          alert(
            result?.message ||
            'Unable to submit feedback.'
          );

        }

      })

      .catch((error: any) => {

        console.log(
          'Save Shop Owner Feedback Error:',
          error
        );


        alert(
          error?.error?.message ||
          'Unable to submit feedback. Please try again.'
        );

      });

  }

}