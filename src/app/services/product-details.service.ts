import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { RouterModule ,Routes,ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  url = 'https://localhost:44396/api/product/';
  GallaryUrl = 'https://localhost:44396/api/ProductGallary/'
  urlCategory='https://localhost:44396/api/product/Category';

  constructor(private http: HttpClient) { }
  getProduct(id:any)
  {
    return this.http.get(this.url+id);
  }
  getProductPictures(id:any){
    return this.http.get(this.GallaryUrl+id);
  }


  getCategory(){
    return this.http.get(this.urlCategory);
  }
}
