import { ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { HeaderService } from 'src/app/services/header.service';
import { SearchService } from 'src/app/services/search.service';
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  navPramiters:any;
  public totalItem : number =0;
  constructor(private searchService : SearchService,
              private activatedRoute: ActivatedRoute,
              private headerNavService : HeaderService ,
              private router: Router ,
              private elRef:ElementRef,
              private cart: CartService,
              private myCategoryService:CategoryService) { }

  ngOnInit(): void {
    this.headerNavService.getCategory().subscribe((res)=>{
      this.navPramiters = res;
      // console.log(this.navPramiters);
    })
    //get products number to cart icon
    this.cart.getProducts().subscribe(res => {
      this.totalItem = res.length;
    })
  }


  Search(){
    let searchValue = this.elRef.nativeElement.querySelector('.inputSearch').value;
    if(searchValue != ''){
      if(!this.router.url.includes('/search/')){
                console.log(searchValue)
                let link = ['/search/'+searchValue];
                this.router.navigate(link);

      }else{

        this.activatedRoute.snapshot.params
        this.searchService.getData(searchValue).subscribe((res :any)=>{
          console.log( this.activatedRoute.snapshot.params );
          // let searchid = this.activatedRoute.snapshot.params.id;
          // document.location.reload();
          this.router.navigate(['/search/'+searchValue]);
          // this.searchService.filter("Register Click")


        })
      }


    }
  }

  
}


 //to make other component listen and afeected with change occurs in srevices




