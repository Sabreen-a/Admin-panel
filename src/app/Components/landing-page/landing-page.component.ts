import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LandingPageService } from 'src/app/services/landing-page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  products:any;
  categories:any;
  getproductPicture:any;
  num:number = 2;
  productPicture:string ='';
  constructor(private productsService : LandingPageService , private cart : CartService) {

   }


  ngOnInit(): void {
    this.productsService.getProducts().subscribe((res)=>{
     this.products= res;
     console.log(this.products);
    })
    this.productsService.getCategory().subscribe((res)=>{
      this.categories = res;
      console.log(this.categories);
    })
    this.productsService.getPicture(this.productPicture).subscribe((res)=>{
      this.getproductPicture = res;
      console.log(this.getproductPicture);
    })
  }


  AddToCart(data:any){
    console.log(data);
    this.cart.addtoCart(data)
  }
  ngAfterViewInit(){
    setTimeout(function () {

    (<any>$('.owl-carousel')).owlCarousel({
      dots: true,
      autoplay: true,
      loop: true,
      margin: 5,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
    }
  })
}, 2500);
}

}

