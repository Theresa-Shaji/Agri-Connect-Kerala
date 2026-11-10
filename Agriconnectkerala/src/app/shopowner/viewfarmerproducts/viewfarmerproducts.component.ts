import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewfarmerproducts',
  templateUrl: './viewfarmerproducts.component.html',
  styleUrls: ['./viewfarmerproducts.component.scss']
})
export class ViewfarmerproductsComponent implements OnInit {

  productArray: any[] = [];


  constructor(
    private db: DbserviceService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.loadProducts();

  }


  loadProducts(): void {

    this.db
      .viewFarmerProducts()
      .then((result: any) => {

        console.log(
          'Farmer Products:',
          result
        );

        this.productArray = result || [];

      })
      .catch((error: any) => {

        console.error(
          'Load Products Error:',
          error
        );

      });

  }


  // =====================================================
  // OPEN SEND REQUEST PAGE
  // =====================================================

  sendRequest(
    productid: any,
    farmerid: any
  ): void {

    console.log(
      'Product ID:',
      productid
    );

    console.log(
      'Farmer ID:',
      farmerid
    );


    this.router.navigate([
      '/shopownermaster/sendrequest',
      productid,
      farmerid
    ]);

  }

}