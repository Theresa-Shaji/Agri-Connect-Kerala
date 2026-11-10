import { Component } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-acceptedshopownerview',
  templateUrl: './acceptedshopownerview.component.html',
  styleUrls: ['./acceptedshopownerview.component.scss']
})
export class AcceptedshopownerviewComponent {
  public acceptedshopownerArray: any[] = [];

  constructor(private dbservice: DbserviceService) { }


  ngOnInit(): void {

    this.loadAcceptedShopOwners();

  }


  loadAcceptedShopOwners() {

    this.dbservice.acceptedshopownerview().then((data: any) => {

      this.acceptedshopownerArray = data;

      console.log(this.acceptedshopownerArray);

    });

  }

}