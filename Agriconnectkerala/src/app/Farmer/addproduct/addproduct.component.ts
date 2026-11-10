import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  categoryArray: any[] = [];
  districtArray: any[] = [];
  locationArray: any[] = [];

  product: any = {

    farmerid: localStorage.getItem("farmerid"),

    categoryid: '',
    productname: '',
    quantity: '',
    unit: '',
    quality: '',
    expectedprice: '',
    image: '',
    description: '',
    uploaddate: '',
    districtid: '',
    locationid: '',
    status: 'Available'

  };

  constructor(
    private db: DbserviceService,
    private router: Router
  ) { }

 ngOnInit(): void {

  this.product.uploaddate = new Date().toISOString().split('T')[0];

  // console.log(this.product.uploaddate);

  this.loadCategory();
  this.loadDistrict();

}

  // Load Category

  loadCategory() {

    this.db.categoryview().then((result: any) => {

      this.categoryArray = result;

    });

  }

  // Load District

  loadDistrict() {

    this.db.districtview().then((result: any) => {

      this.districtArray = result;

    });

  }

  // Load Location

  loadLocation() {

    let data = {

      districtid: this.product.districtid

    };

    this.db.getdistrictbyid(data).then((result: any) => {

      this.locationArray = result;

    });

  }

  // Upload Product Image

  uploadImage(event: any) {

    const file = event.target.files[0];

    if (file) {

      this.db.upload(file).subscribe((res: any) => {

        if (res.body) {

          this.product.image = res.body.filename;

        }

      });

    }

  }

  // Save Product

  saveProduct() {

    if (this.product.categoryid == "") {

      alert("Please Select Category");

      return;

    }

    if (this.product.productname.trim() == "") {

      alert("Enter Product Name");

      return;

    }

    if (this.product.quantity == "" || this.product.quantity <= 0) {

      alert("Enter Valid Quantity");

      return;

    }

    if (this.product.unit == "") {

      alert("Select Unit");

      return;

    }

    if (this.product.quality == "") {

      alert("Select Product Quality");

      return;

    }

    if (this.product.expectedprice == "" || this.product.expectedprice <= 0) {

      alert("Enter Expected Price");

      return;

    }

    if (this.product.districtid == "") {

      alert("Select District");

      return;

    }

    if (this.product.locationid == "") {

      alert("Select Location");

      return;

    }

    if (this.product.description.trim() == "") {

      alert("Enter Product Description");

      return;

    }

    if (this.product.image == "") {

      alert("Upload Product Image");

      return;

    }

    console.log(this.product);

    this.db.productreg(this.product).then((result: any) => {

      console.log(result);

      if (result.status == "success") {

        alert("Product Added Successfully");

        this.router.navigate(['/farmermaster/viewproduct']);

      }

      else {

        alert("Failed to Add Product");

      }

    });

  }

}