import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 BaseUrl=environment.APIURL+"/category";
 
 //to link between category name in header and category in select in category page
 caategoryName:any;
 
 id:any;
  constructor(private client:HttpClient,private Route:Router) {}
   add(category:any){

    return this.client.post(this.BaseUrl,category);

   }
  //to get all category

   GetAllCategory(){
  return this.client.get(this.BaseUrl);

   }

   //to get category by id
   GetCategoryById(id:any){
     return this.client.get(`${this.BaseUrl}/${id}`)
   }
  //to delete category
   Delete(id:any){
    return  this.client.delete(`${this.BaseUrl}/${id}`);
   }

   //edit category
    Edit(id:number,category:any){
      return this.client.put(`${this.BaseUrl}/${id}`,category);
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
