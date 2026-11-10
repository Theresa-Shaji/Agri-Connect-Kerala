import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-categoryview',
  templateUrl: './categoryview.component.html',
  styleUrls: ['./categoryview.component.scss']
})
export class CategoryviewComponent {
public categoryArray:any[]=[]; 
    constructor(private fb: FormBuilder, private router:Router ,private dbservice: DbserviceService){} 
    ngOnInit():void 
    {  
      this.dbservice.categoryview().then((data:any)=>{this.categoryArray=data}); 
    } 
  


  Deletecategorydata(categoryid: string) {
  this.dbservice.Deletecategorydata({ categoryid }).then((confirmation: any) => {

    if (confirmation.message === "Success") {
      alert('Successfully Deleted');

      this.dbservice.categoryview().then((data:any)=>{
        this.categoryArray = data;
      });

    }

  });
  }
}