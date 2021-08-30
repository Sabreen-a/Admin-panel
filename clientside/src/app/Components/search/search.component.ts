import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


   getdata: any;

  constructor(private searchService : SearchService, private activatedRoute: ActivatedRoute, private router: Router ,private cart : CartService)
  {
    // this.searchService.listen().subscribe((m:any)=>{
    //   console.log(m);
    //   this.getSearchData();
    // })
  }

  getSearchData(){
    let searchid = this.activatedRoute.snapshot.params.id;
    this.searchService.getData(searchid).subscribe((res :any)=>{
      this.getdata = res;
      console.log(this.getdata);

     })
  }
  ngOnInit(): void {
    this.getSearchData();
  }
  AddToCart(data:any){
    console.log(data);
    this.cart.addtoCart(data)
  }
}
