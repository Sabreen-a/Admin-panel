import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Iproduct } from 'src/app/datatype/iproduct';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashproductserviceService {

  BaseUrl=environment.APIURL+"/product";
  UrlForAllProduct=environment.APIURL+"/product/allproduct"
  URLFORGETALLPRODUCTBASEDONCATEGROYID=environment.APIURL+"/product/category";
  //url for search
  SearchUrl=environment.APIURL+"/product/?Sort=";
  Baesimg=environment.APIIMAGE;
  id:any;
  dbset:any[]=[];
  dbset2:any[]=[];
   constructor(private client:HttpClient,private Route:Router) {
     this.dbset.push(this.GetAllProduct().subscribe((r)=>{this.dbset=r as Iproduct[]},(err)=>console.log(err)));
     this.dbset2=this.dbset.slice(0,3);

   }
    add(product:FormData){
      console.log("service");
      return this.client.post(this.BaseUrl,product);
    }
   //get all products without pagination
   GetAllProductsWithOutPagination(){
     return this.client.get(this.UrlForAllProduct);
   }
    //to get all product with pagination pageindex&pagesize

   GetAllProduct(){
    return this.client.get(this.BaseUrl);

     }

     //to get product by id
     GetProductById(id:any){
       return this.client.get(`${this.BaseUrl}/${id}`)
     }
    //to delete product
     Delete(id:any){
       console.log(`${this.BaseUrl}?id=${id}`);
      return  this.client.delete(`${this.BaseUrl}/?id=${id}`);

     }

     //edit product
      Edit(id:number,product:any){
        return this.client.put(`${this.BaseUrl}/?id=${id}`,product);
      }
     //get product by categoryid
     GetAllProductsByProductBrandId(id:any){
      //alert(`${this.URLFORGETALLPRODUCTBASEDONCATEGROYID}/${id}`);
      return this.client.get(`${this.URLFORGETALLPRODUCTBASEDONCATEGROYID}/${id}`);
      
     }
     //gwt all product using category name and category id
     //https://localhost:44396/api/product/?api/product/?search=sabreena&BrandId=8
     GetAllProductsUsingCategoryName(categoryname:any,categoryid:any){
       return this.client.get(`${this.SearchUrl}search=${categoryname}&BrandId=${categoryid}`)
     }

     //to make other component listen and afeected with change occurs in srevices
     private _listeners=new Subject<any>();
     listen():Observable<any>{
       return this._listeners.asObservable();
     }
     filter(filterBy:string){
       this._listeners.next(filterBy);
     }
}
