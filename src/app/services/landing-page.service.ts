import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  urlproduct = 'https://localhost:44396/api/product/allproduct';
  urlCategory='https://localhost:44396/api/product/Category';
  constructor(private http: HttpClient) { }
  getProducts()
  {
    return this.http.get(this.urlproduct);

  }
  getCategory(){

    return this.http.get(this.urlCategory);
  }
  getPicture(urlproductPicture: any){
    return this.http.get(urlproductPicture);
  }


}
