declare var Swiper: any;

import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-guesthome',
  templateUrl: './guesthome.component.html',
  styleUrls: ['./guesthome.component.scss']
})
export class GuesthomeComponent implements OnInit {

  categorydata: any[] = [];

  constructor(private db: DbserviceService) { }

  ngOnInit(): void {
    this.viewCategory();
  }

  async viewCategory() {

    const res: any = await this.db.categoryview();

    this.categorydata = res;

    setTimeout(() => {

      new Swiper('.init-swiper', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: false,

        navigation: {
          nextEl: '.js-custom-next',
          prevEl: '.js-custom-prev'
        },

        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },

        breakpoints: {
          320: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 2
          },
          1200: {
            slidesPerView: 3
          }
        }
      });

    }, 1000);

  }
}