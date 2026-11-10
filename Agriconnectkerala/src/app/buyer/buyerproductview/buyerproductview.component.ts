import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-buyerproductview',
  templateUrl: './buyerproductview.component.html',
  styleUrls: ['./buyerproductview.component.scss']
})
export class BuyerproductviewComponent implements OnInit {

  productArray: any[] = [];
  buyerid: any;

  constructor(
    private db: DbserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.buyerid = localStorage.getItem('buyerid');

    this.viewProducts();
  }

  viewProducts(): void {

    const data = {
      buyerid: this.buyerid
    };

    this.db.viewBuyerProducts(data).then((result: any) => {

      console.log('Buyer Products:', result);

      if (result) {
        this.productArray = result;
      } else {
        this.productArray = [];
      }

    }).catch((error: any) => {

      console.log('Product View Error:', error);

      this.productArray = [];

    });
  }

  viewDetails(productid: any): void {

    this.router.navigate([
      '/buyermaster/buyerproductdetails',
      productid
    ]);

  }

}