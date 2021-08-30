import { Component, ElementRef, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products :any = [];
  public grandTotal !:number;
  public productCount :number = 1;
  constructor( private cart : CartService , private elRef:ElementRef ) { }

  ngOnInit(): void {
    this.getProductsToCart();
  }

  getProductsToCart(){
    this.cart.getProducts().subscribe(res =>{

      this.products = res;
      this.grandTotal = this.cart.getTotalPrice();

    })
  }
  removeItem(data :any){
    this.cart.removeCartItem(data);

  }



  selected(data:any ,product :any){
    this.products.map((item:any, index:any)=>{
      if(product.id == item.id && data.srcElement.id == product.id){
        let totalPriceProduct = this.elRef.nativeElement.querySelector('#id'+product.id);
        totalPriceProduct.innerHTML= '"' + product.price * ( data.target.options.selectedIndex+1)+'"' +"EGP"
        if( data.target.options.selectedIndex == 0){
          this.grandTotal =this.cart.getTotalPrice();
        }
        else if(this.grandTotal == product.price){
          this.grandTotal = product.price * ( data.target.options.selectedIndex+1) ;

        }
        else{
          this.grandTotal =this.cart.getTotalPrice()+ (product.price * ( data.target.options.selectedIndex));

        }
      }
    })
  }
}
