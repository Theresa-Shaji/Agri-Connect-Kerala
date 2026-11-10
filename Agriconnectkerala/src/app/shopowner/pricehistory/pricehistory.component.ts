import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricehistory',
  templateUrl: './pricehistory.component.html',
  styleUrls: ['./pricehistory.component.scss']
})

export class PricehistoryComponent implements OnInit {

  groupedArray:any[]=[];

  summary:any = {
    totalProducts:0,
    increased:0,
    decreased:0,
    stable:0,
    avgPrice:0
  };

  today = new Date();

  constructor(
    private db: DbserviceService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadPriceHistory();
  }

  loadPriceHistory()
  {
    let data = {
      shopownerid: localStorage.getItem('shopownerid')
    };

    this.db.viewPriceHistory(data).then((res:any)=>{

      console.log(res);

      if(res.length > 0)
      {
        this.prepareHistory(res);
      }

    });
  }

  prepareHistory(data:any[])
  {
    let grouped:any = {};

    data.forEach(item=>{

      if(!grouped[item.categoryname])
      {
        grouped[item.categoryname] = [];
      }

      grouped[item.categoryname].push(item);

    });

    this.groupedArray = [];

    Object.keys(grouped).forEach(category=>{

      let history = grouped[category];

      history.sort((a:any,b:any)=>{

        return new Date(b.updatedate).getTime()
        -
        new Date(a.updatedate).getTime();

      });

      let latest = history[0];
      let previous = history[1];

      let direction = "stable";
      let changePercent:any = 0;

      if(previous)
      {
        if(latest.price > previous.price)
        {
          direction = "up";
        }
        else if(latest.price < previous.price)
        {
          direction = "down";
        }

        changePercent =
        (
          ((latest.price - previous.price)
          /
          previous.price) * 100
        ).toFixed(2);
      }

    this.groupedArray.push({

  categoryname: category,
  image: latest.image,

  latestPrice: latest.price,
  unit: latest.unit,
  updatedate: latest.updatedate,

  direction: direction,
  changePercent: changePercent,

  history: history

});

    });

    this.calculateSummary();
  }

  calculateSummary()
  {
    this.summary.totalProducts =
    this.groupedArray.length;

    this.summary.increased =
    this.groupedArray.filter(x =>
      x.direction == "up"
    ).length;

    this.summary.decreased =
    this.groupedArray.filter(x =>
      x.direction == "down"
    ).length;

    this.summary.stable =
    this.groupedArray.filter(x =>
      x.direction == "stable"
    ).length;

    let total = 0;
    let count = 0;

    this.groupedArray.forEach(item=>{

      item.history.forEach((h:any)=>{

        total += Number(h.price);
        count++;

      });

    });

    if(count > 0)
    {
      this.summary.avgPrice =
      (total / count).toFixed(2);
    }
  }

  editPrice(priceid:any)
  {
    localStorage.setItem("priceid", priceid);

    this.router.navigate([
      '/shopownermaster/editpriceupdate'
    ]);
  }
deletePrice(priceid:any)
{
  console.log("Delete button clicked", priceid);

  if(confirm("Are you sure you want to delete this price update?"))
  {
    let data = {
      priceid: priceid
    };

    console.log("Sending Data:", data);

    this.db.deletePriceUpdate(data).then((res:any)=>{

      console.log("Response:", res);

      alert("Price deleted successfully");

      this.groupedArray = [];

      this.loadPriceHistory();

    });
  }
}
}