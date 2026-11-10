import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-farmerfeedback',
  templateUrl: './farmerfeedback.component.html',
  styleUrls: ['./farmerfeedback.component.scss']
})
export class FarmerfeedbackComponent implements OnInit {

  feedbackArray: any[] = [];

  farmerid: any;

  loading: boolean = true;

  errorMessage: string = '';


  constructor(
    private db: DbserviceService
  ) { }


  ngOnInit(): void {

    // =========================================
    // GET FARMER ID
    // =========================================

    this.farmerid =
      localStorage.getItem('farmerid');


    console.log(
      'Logged in Farmer ID:',
      this.farmerid
    );


    // =========================================
    // CHECK FARMER ID
    // =========================================

    if (!this.farmerid) {

      this.loading = false;

      this.errorMessage =
        'Farmer ID not found. Please login again.';

      return;

    }


    // =========================================
    // LOAD FEEDBACK
    // =========================================

    this.loadFarmerFeedback();

  }


  // =========================================
  // LOAD FARMER FEEDBACK
  // =========================================

  loadFarmerFeedback(): void {

    this.loading = true;

    this.errorMessage = '';


    const data = {

      farmerid: this.farmerid

    };


    console.log(
      'Sending Farmer Feedback Request:',
      data
    );


    this.db.getFarmerFeedback(data)

      .then((result: any) => {

        console.log(
          'Farmer Feedback Response:',
          result
        );


        this.loading = false;


        // =====================================
        // SUCCESS
        // =====================================

        if (
          result &&
          result.status === 'success'
        ) {

          this.feedbackArray =
            result.data || [];


          console.log(
            'Feedback Count:',
            this.feedbackArray.length
          );


          // ===================================
          // DEBUG EACH FEEDBACK
          // ===================================

          this.feedbackArray.forEach(
            (feedback: any) => {

              console.log(
                '-----------------------------'
              );

              console.log(
                'Feedback ID:',
                feedback.feedbackid
              );

              console.log(
                'Product:',
                feedback.productname
              );

              console.log(
                'Quantity:',
                feedback.quantity
              );

              console.log(
                'Price:',
                feedback.price
              );

              console.log(
                'Unit:',
                feedback.unit
              );

              console.log(
                'From User Type:',
                feedback.fromusertype
              );

              console.log(
                'Buyer Name:',
                feedback.buyername
              );

              console.log(
                'Shop Name:',
                feedback.shopname
              );

              console.log(
                'Shop Owner Name:',
                feedback.shopownername
              );

              console.log(
                'Shop Owner Phone:',
                feedback.shopownerphone
              );

              console.log(
                'Rating:',
                feedback.rating
              );

              console.log(
                'Feedback:',
                feedback.feedback
              );

            }
          );

        }


        // =====================================
        // FAILED
        // =====================================

        else {

          this.feedbackArray = [];

          this.errorMessage =
            result?.message ||
            'Unable to load feedback.';

        }

      })


      // =======================================
      // ERROR
      // =======================================

      .catch((error: any) => {

        console.log(
          'Farmer Feedback Error:',
          error
        );


        this.loading = false;

        this.feedbackArray = [];


        this.errorMessage =
          'Unable to load feedback. Please try again.';

      });

  }

}