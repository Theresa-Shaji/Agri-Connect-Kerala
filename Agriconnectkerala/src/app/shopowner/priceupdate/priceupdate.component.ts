import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-priceupdate',
  templateUrl: './priceupdate.component.html',
  styleUrls: ['./priceupdate.component.scss']
})
export class PriceupdateComponent implements OnInit {

  categoryArray:any[] = [];

  price:any = {
    categoryid:'',
    price:'',
    updatedate:'',
    unit:'',
    trend:''
  };

  constructor(
    private db: DbserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.viewShopCategories();

    let today = new Date();

    this.price.updatedate =
    today.toISOString().split('T')[0];

  }

  // Load Shop Owner Categories

  viewShopCategories()
  {
    let data = {

      shopownerid:
      localStorage.getItem("shopownerid")

    };

    this.db.viewShopCategories(data)
    .then((result:any)=>{

      console.log(result);

      this.categoryArray = result;

    });
  }

  // Save Price Update

  updatePrice()
  {

    let data = {

      shopownerid:
      localStorage.getItem("shopownerid"),

      categoryid:
      this.price.categoryid,

      price:
      this.price.price,

      updatedate:
      this.price.updatedate,

      unit:
      this.price.unit,

      trend:
      this.price.trend

    };

    this.db.updatePrice(data)
    .then((result:any)=>{

      console.log(result);

      alert("Price Updated Successfully");

      this.router.navigate([
        '/shopownermaster/pricehistory'
      ]);

    })
    .catch((error)=>{

      console.log(error);

      alert("Failed to Update Price");

    });

  }

}