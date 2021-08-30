import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  BaseUrl=environment.APIURL+'/Subcat';
  id:any;
  constructor(private client:HttpClient,private Route:Router) { }

  add(subcategory:any){
     
    return this.client.post(this.BaseUrl,subcategory);

   }
  //to get all category

   GetAllSubCategory(){
    return this.client.get(this.BaseUrl);

   }

   //to get category by id
   GetSubCategoryById(id:any){
     return this.client.get(`${this.BaseUrl}/${id}`)
   }
  //to delete category
   Delete(id:any){
    return  this.client.delete(`${this.BaseUrl}/${id}`);
   }

   //edit category
    Edit(id:number,subcategory:any){
      return this.client.put(`${this.BaseUrl}/${id}`,subcategory);
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
