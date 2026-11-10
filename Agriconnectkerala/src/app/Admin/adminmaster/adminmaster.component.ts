import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminmaster',
  templateUrl: './adminmaster.component.html',
  styleUrls: ['./adminmaster.component.scss']
})
export class AdminmasterComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['guestmaster/login']);
  }

}