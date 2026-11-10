declare var Swiper: any;
import { Component } from '@angular/core';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-shopownerhome',
  templateUrl: './shopownerhome.component.html',
  styleUrls: ['./shopownerhome.component.scss']
})
export class ShopownerhomeComponent {
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