import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-shopownercategory',
  templateUrl: './shopownercategory.component.html',
  styleUrls: ['./shopownercategory.component.scss']
})
export class ShopownercategoryComponent implements OnInit {

  categoryArray:any[] = [];

  addedCategories:number[] = [];

  constructor(private db:DbserviceService) {}

  ngOnInit(): void {
    this.viewCategory();
  }

  async viewCategory()
  {
    const res:any = await this.db.categoryview();
    this.categoryArray = res;
  }

 async saveCategory(categoryid:any)
{
  const data = {
    shopownerid: localStorage.getItem("shopownerid"),
    categoryid: categoryid
  };

  const result:any = await this.db.saveShopOwnerCategory(data);

  if(result == "Success")
  {
    this.addedCategories.push(categoryid);

    alert("Category Added Successfully");
  }
  else if(result == "Already Added")
  {
    this.addedCategories.push(categoryid);

    alert("Category Already Added");
  }
  else
  {
    alert("Failed to Add Category");
  }
}
}