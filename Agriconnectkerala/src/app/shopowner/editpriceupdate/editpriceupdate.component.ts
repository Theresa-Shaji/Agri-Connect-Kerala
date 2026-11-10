import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-editpriceupdate',
  templateUrl: './editpriceupdate.component.html',
  styleUrls: ['./editpriceupdate.component.scss']
})
export class EditpriceupdateComponent implements OnInit {


  categoryArray:any[] = [];

  priceid:any;


  constructor(
    private fb: FormBuilder,
    private db: DbserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }



  priceForm = this.fb.group({

    priceid:[''],
    categoryid:[''],
    price:[''],
    updatedate:[''],
    unit:[''],
    trend:['']

  });



  ngOnInit(): void {


    // Get price id from URL
    this.priceid = this.route.snapshot.paramMap.get('id');

    console.log("Price ID:", this.priceid);


    this.loadCategories();

    this.getPriceDetails();

  }





  // Load categories

  async loadCategories()
  {

    const res:any = await this.db.categoryview();

    this.categoryArray = res;

  }







  // Get existing price details

  async getPriceDetails()
  {

    const data = {

      priceid:this.priceid

    };


    const result:any = await this.db.getpriceupdatedetails(data);


    console.log("Price Details:", result);



    if(result.length > 0)
    {


      // Convert database date format for date input

      let date = new Date(result[0].updatedate)
      .toISOString()
      .split('T')[0];



      this.priceForm.patchValue({

        priceid: result[0].priceid,

        categoryid: result[0].categoryid,

        price: result[0].price,

        updatedate: date,

        unit: result[0].unit,

        trend: result[0].trend

      });


    }

  }







  // Update Price

  async updatePrice()
  {


    console.log(this.priceForm.value);



    const result:any = await this.db.updateprice(
      this.priceForm.value
    );



    console.log(result);



    if(result.status=="success")
    {

      alert("Price Updated Successfully");


      // Redirect to Price History page

      this.router.navigate([
        '/shopownermaster/pricehistory'
      ]);

    }
    else
    {

      alert("Update Failed");

    }


  }


}