import { Component, OnInit } from '@angular/core';
import { DbserviceService } from '../../dbservice.service';

@Component({
  selector: 'app-viewmarketprice',
  templateUrl: './viewmarketprice.component.html',
  styleUrls: ['./viewmarketprice.component.scss']
})
export class ViewmarketpriceComponent implements OnInit {

  // Dropdown lists
  districtList: any[] = [];
  locationList: any[] = [];
  categoryList: any[] = [];

  // Market price data
  priceList: any[] = [];

  // Selected filters
  districtid: any = "";
  locationid: any = "";
  categoryid: any = "";


  constructor(
    private service: DbserviceService
  ) { }


  ngOnInit(): void {

    // Load dropdown data
    this.getDistrict();
    this.getCategory();

    // Load all locations initially
    this.getAllLocations();

    // IMPORTANT:
    // When page opens, show ALL market prices
    this.searchPrice();

  }


  // =====================================================
  // GET ALL DISTRICTS
  // =====================================================

  getDistrict() {

    this.service.getDistrict()
      .subscribe({

        next: (result: any) => {

          this.districtList = result;

        },

        error: (err: any) => {

          console.error(
            "Error fetching districts",
            err
          );

          this.districtList = [];

        }

      });

  }


  // =====================================================
  // GET ALL LOCATIONS
  // =====================================================

  getAllLocations() {

    this.service.getLocation('all')
      .subscribe({

        next: (result: any) => {

          this.locationList = result;

        },

        error: (err: any) => {

          console.error(
            "Error fetching locations",
            err
          );

          this.locationList = [];

        }

      });

  }


  // =====================================================
  // GET LOCATION BASED ON DISTRICT
  // =====================================================

  getLocation() {

    // Reset selected location
    this.locationid = "";

    // If "All Districts" selected
    if (!this.districtid) {

      this.getAllLocations();

      return;

    }


    // Get locations belonging to selected district
    this.service.getLocation(this.districtid)
      .subscribe({

        next: (result: any) => {

          this.locationList = result;

        },

        error: (err: any) => {

          console.error(
            "Error fetching locations",
            err
          );

          this.locationList = [];

        }

      });

  }


  // =====================================================
  // GET CATEGORY
  // =====================================================

  getCategory() {

    this.service.getCategory()
      .subscribe({

        next: (result: any) => {

          this.categoryList = result;

        },

        error: (err: any) => {

          console.error(
            "Error fetching categories",
            err
          );

          this.categoryList = [];

        }

      });

  }


  // =====================================================
  // SEARCH MARKET PRICE
  // =====================================================

  searchPrice() {

    const data = {

      districtid: this.districtid,

      locationid: this.locationid,

      categoryid: this.categoryid

    };


    console.log(
      "Searching Market Price:",
      data
    );


    this.service.searchMarketPrice(data)
      .subscribe({

        next: (result: any) => {

          console.log(
            "Market Price Result:",
            result
          );

          this.priceList = result;

        },

        error: (err: any) => {

          console.error(
            "Error fetching market prices",
            err
          );

          this.priceList = [];

        }

      });

  }


  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  clearFilters() {

    // Reset filters

    this.districtid = "";

    this.locationid = "";

    this.categoryid = "";


    // Load all locations again

    this.getAllLocations();


    // Show all market prices

    this.searchPrice();

  }

}