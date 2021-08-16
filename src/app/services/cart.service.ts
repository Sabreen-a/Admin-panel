import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  constructor() { }

  getProducts(){
    return this.productList.asObservable();
  }
  setProducts(product :any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }
  getTotalPrice() :number{
    let grandTotal = 0;
    this.cartItemList.map((item:any)=>{
      grandTotal += item.price;
    })
    return grandTotal;
  }

  removeCartItem(product : any){
    this.cartItemList.map((item:any, index:any)=>{
      if(product.id == item.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);

  }
}


// postBasket(basket:IBasket)
// {
// return this.http.post(this.url+'Basket',basket).subscribe((res:any)=>{
//      this.basketsource.next(res);
//        alert("success");
// },
// err=>{
//          console.log('error');
//       })
//     }
