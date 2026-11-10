import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.scss']
})
export class ViewproductComponent implements OnInit {

  productArray:any=[];

  constructor(
  private db: DbserviceService,
  private router: Router
) { }

  ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts(){

    let data={

      farmerid:localStorage.getItem("farmerid")

    }

    this.db.viewProduct(data).then((result:any)=>{

      console.log(result);

      this.productArray=result;

    });

  }
editProduct(id: any) {

  console.log("Product ID:", id);

  this.router.navigate(['/farmermaster/editproduct', id]);

}


deleteProduct(id:any){

  if(confirm("Are you sure you want to delete this product?")){

    let data={

      productid:id

    }

    this.db.deleteproduct(data).then((result:any)=>{

      if(result.status=="success"){

        alert("Product Deleted Successfully");

        this.loadProducts();

      }

      else{

        alert("Delete Failed");

      }

    });

  }

}
}