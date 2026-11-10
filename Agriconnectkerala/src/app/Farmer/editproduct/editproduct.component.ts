import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {

  categoryArray:any[]=[];
  districtArray:any[]=[];
  locationArray:any[]=[];

  product:any={};

  constructor(
    private db:DbserviceService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.loadCategory();

    this.loadDistrict();

    this.getProduct();

  }

  loadCategory(){

    this.db.categoryview().then((result:any)=>{

      this.categoryArray=result;

    });

  }

  loadDistrict(){

    this.db.districtview().then((result:any)=>{

      this.districtArray=result;

    });

  }

  loadLocation(){

    let data={

      districtid:this.product.districtid

    }

    this.db.getdistrictbyid(data).then((result:any)=>{

      this.locationArray=result;

    });

  }

  getProduct(){

    let data={

      id:this.route.snapshot.params['id']

    }

    this.db.getproductdetails(data).then((result:any)=>{

      this.product=result[0];

      this.loadLocation();

    });

  }

  uploadImage(event:any){

    const file=event.target.files[0];

    if(file){

      this.db.upload(file).subscribe((res:any)=>{

        if(res.body){

          this.product.image=res.body.filename;

        }

      });

    }

  }

  updateProduct(){

    this.db.updateproduct(this.product).then((result:any)=>{

      if(result.status=="success"){

        alert("Product Updated Successfully");

        this.router.navigate(['/farmermaster/viewproduct']);

      }

      else{

        alert("Update Failed");

      }

    });

  }

}