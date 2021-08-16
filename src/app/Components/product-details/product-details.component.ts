import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductDetailsService } from 'src/app/services/product-details.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDetails:any;
  productPictures:any;
  // getPicture:any;
  constructor(private productService : ProductDetailsService, private activatedRoute: ActivatedRoute, private cart : CartService)
   {

   }

  ngOnInit(): void {
    let productid = this.activatedRoute.snapshot.params.id;
    // console.log(productid);
    this.productService.getProduct(productid).subscribe((res :any)=>{
     this.productDetails= res;
     console.log(res)
    //  console.log(this.productDetails);
    })


    this.productService.getProductPictures(productid).subscribe((res)=>{
      this.productPictures= res;
      // console.log(this.productPictures);

     })

  }

  AddToCart(data:any){
    console.log(data);
    this.cart.addtoCart(data)
  }

}
