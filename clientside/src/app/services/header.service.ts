import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {


  url = 'https://localhost:44396/api/category'

  constructor(private http: HttpClient) { }
  getCategory()
  {
    return this.http.get(this.url);
  }

}
