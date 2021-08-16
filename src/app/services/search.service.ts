import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url = 'https://localhost:44396/api/product/?Sort=priceAsc&search=';

  constructor(private http: HttpClient) { }
  getData(id:any)
  {
    return this.http.get(this.url+id);
  }


  // private _listeners=new Subject<any>();
  // listen():Observable<any>{
  //   return this._listeners.asObservable();
  // }
  // filter(filterBy:string){
  //   this._listeners.next(filterBy);
  // }

}
