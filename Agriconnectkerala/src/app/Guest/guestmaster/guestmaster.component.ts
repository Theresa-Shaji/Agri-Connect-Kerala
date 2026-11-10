import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guestmaster',
  templateUrl: './guestmaster.component.html',
  styleUrls: ['./guestmaster.component.scss']
})
export class GuestmasterComponent {
 constructor(public router: Router) {}
}
