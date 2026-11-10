import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-buyerfeedback',
  templateUrl: './buyerfeedback.component.html',
  styleUrls: ['./buyerfeedback.component.scss']
})
export class BuyerfeedbackComponent implements OnInit {

  feedbackRequests: any[] = [];

  buyerid: any;

  loading: boolean = true;

  errorMessage: string = '';


  constructor(
    private db: DbserviceService
  ) { }


  ngOnInit(): void {

    this.buyerid = localStorage.getItem('buyerid');

    console.log('Buyer ID:', this.buyerid);


    if (!this.buyerid) {

      this.loading = false;

      this.errorMessage =
        'Buyer ID not found. Please login again.';

      return;

    }


    this.loadFeedbackRequests();

  }


  // =====================================
  // LOAD PURCHASES FOR FEEDBACK
  // =====================================

  loadFeedbackRequests(): void {

    this.loading = true;

    this.errorMessage = '';


    const data = {

      buyerid: this.buyerid

    };


    console.log(
      'Feedback Requests Data:',
      data
    );


    this.db.getFeedbackRequests(data)

      .then((result: any) => {

        console.log(
          'Feedback Requests Result:',
          result
        );


        this.loading = false;


        // =====================================
        // BACKEND RETURNS ARRAY DIRECTLY
        // =====================================

        if (Array.isArray(result)) {

          this.feedbackRequests = result;


          // Initialize rating and feedback
          this.feedbackRequests.forEach(
            (request: any) => {

              request.rating =
                request.rating || 0;

              request.feedback =
                request.feedback || '';

            }
          );


          console.log(
            'Feedback Requests Array:',
            this.feedbackRequests
          );

        }


        // =====================================
        // IF BACKEND RETURNS {status, data}
        // =====================================

        else if (
          result &&
          result.status === 'success'
        ) {

          this.feedbackRequests =
            result.data || [];


          this.feedbackRequests.forEach(
            (request: any) => {

              request.rating =
                request.rating || 0;

              request.feedback =
                request.feedback || '';

            }
          );

        }


        // =====================================
        // NO DATA / ERROR
        // =====================================

        else {

          this.feedbackRequests = [];

          this.errorMessage =
            result?.message ||
            'Unable to load feedback requests.';

        }

      })


      .catch((error: any) => {

        console.log(
          'Feedback Requests Error:',
          error
        );


        this.loading = false;

        this.feedbackRequests = [];


        this.errorMessage =
          'Unable to load feedback requests.';

      });

  }


  // =====================================
  // SUBMIT FEEDBACK
  // =====================================

  submitFeedback(request: any): void {


    // =====================================
    // CHECK RATING
    // =====================================

    if (
      !request.rating ||
      request.rating < 1
    ) {

      alert(
        'Please select a rating.'
      );

      return;

    }


    // =====================================
    // CHECK FEEDBACK
    // =====================================

    if (
      !request.feedback ||
      request.feedback.trim() === ''
    ) {

      alert(
        'Please enter your feedback.'
      );

      return;

    }


    // =====================================
    // CHECK RATING RANGE
    // =====================================

    if (
      request.rating < 1 ||
      request.rating > 5
    ) {

      alert(
        'Rating must be between 1 and 5.'
      );

      return;

    }


    // =====================================
    // CONFIRM
    // =====================================

    const confirmSubmit = confirm(
      'Are you sure you want to submit this feedback?'
    );


    if (!confirmSubmit) {

      return;

    }


    // =====================================
    // FEEDBACK DATA
    // =====================================

    const data = {

      requestid:
        request.requestid,

      buyerid:
        this.buyerid,

      farmerid:
        request.farmerid,

      productid:
        request.productid,

      rating:
        request.rating,

      feedback:
        request.feedback.trim()

    };


    console.log(
      'Submitting Feedback:',
      data
    );


    // =====================================
    // SAVE FEEDBACK
    // =====================================

    this.db.saveFeedback(data)

      .then((result: any) => {

        console.log(
          'Save Feedback Result:',
          result
        );


        // =====================================
        // SUCCESS
        // =====================================

        if (
          result &&
          result.status === 'success'
        ) {

          alert(
            '⭐ Feedback submitted successfully.'
          );


          // Remove submitted purchase
          // from current feedback list

          this.feedbackRequests =
            this.feedbackRequests.filter(
              (item: any) =>
                item.requestid !==
                request.requestid
            );

        }


        // =====================================
        // FAILED
        // =====================================

        else {

          alert(
            result?.message ||
            'Unable to submit feedback.'
          );

        }

      })


      .catch((error: any) => {

        console.log(
          'Save Feedback Error:',
          error
        );


        alert(
          'Unable to submit feedback. Please try again.'
        );

      });

  }

}