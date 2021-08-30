import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'jquery';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { DashproductserviceService } from 'src/app/services/productdashservice/dashproductservice.service';
// import {map} from 'rxjs/operators';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  //declartion variable
  categoryList:any;
  CategoryListWithId:any;
  products:any;
  selectedItems:string[]=[];

  //variable to recieve name of category from home page
  categoryNameComeFromHeader:any;
  @ViewChild('firstCategoryName') firstCategoryName:any;

  //to put name in select when page load based on name that clicked on it from home
  ngAfterViewInit(): void {
  
    
    
  }

  //variable to get name of category from header found in header
   headerName:any;
  constructor(private myservice:CategoryService,
    private myserviceproduct:DashproductserviceService ,
    private cart : CartService,
    private activatedRoute: ActivatedRoute,
    private router:Router) {
    this.fillSelectItem();
    this.categoryselected=this.activatedRoute.snapshot.url.splice(2);
    // this.myservice.listen().subscribe((m:any)=>{
    //   console.log(m);
    //   this.fetchdataproduct(this.headerName);
    // })
    
    
    
   }

  ngOnInit(): void {
    this.getFromUrl();
    //to get id from url
    this.headerName=this.activatedRoute.snapshot.params['id'];
    this.myservice.caategoryName=this.categoryNameComeFromHeader;
    //alert(this.activatedRoute.snapshot.params['id']+"oninit");
    this.fetchdataproduct(this.headerName);
   
  }
  //get  category name from url
  getFromUrl(){
    let categoryName = this.activatedRoute.snapshot.params.id;
    this.myserviceproduct.GetAllProductsWithOutPagination().subscribe((res:any)=>{
      res.map((res:any )=> {
        if(res.productBrand == categoryName){
          this.products = res;
          console.log(res);
          return res;
        }
      })
    })
    this.selectedItems = new Array<string>();
  }

 //fillselect
 fillSelectItem(){
  this.myservice.GetAllCategory().subscribe(
    (result)=>{
      this.categoryList=result;
      console.log(this.categoryList);
    },
    (err)=>{
      console.log(err);
    }
     )

}

//product
fetchdataproduct(id:any){
   
     return this.myserviceproduct.GetAllProductsByProductBrandId(id).subscribe(
      (result)=>{
        this.products=result;
        //console.log(this.products)
       },
  
      (err)=>{console.log(err)}
    )
  
  
  
}


/****selected */
/**********select */
categoryselected:any=1;//default value
categories:any[]=[];

modifiedText:string="";
categoryNamelistusingID:any;
//select
onCategorySelected(val:any){
  //web api
this.newProducts=[];
this.check='false'
this.customFunction(val);
this.myservice.GetCategoryById(val).subscribe(
  (result)=>{this.categoryNamelistusingID=result},
  (err)=>{console.log(err)}
);
var params=this.activatedRoute.snapshot.url.splice(1)
alert("name parameter"+this.activatedRoute.snapshot.params['name']+"/"+this.modifiedText);
this.myserviceproduct.GetAllProductsByProductBrandId(this.modifiedText).subscribe(
(data)=>{(console.log(data+"product list"),this.products=data),this.router.navigateByUrl(
  '/'+this.modifiedText),alert("succeed")},
(err)=>console.log(err))

console.log(this.products.length);

}
customFunction(val:any){
  this.modifiedText=val;
  //this.modifiedText=$event.target.options[$event.target.options.selectedIndex].text;
}


AddToCart(data:any){
  console.log(data);
  this.cart.addtoCart(data)
}
categoryid:any=[];
check:any="true";
sasa:any[]=[];
newProducts:any[]=[];
categoryOnChange(e:any ){
  this.check="true" 
  this.products=[];
  
  this.newProducts=[];
  
  if(e.target.checked){
   // this.getProductUsingInput();
   
    //get all product based on brand id
    this.myserviceproduct.GetAllProductsByProductBrandId(e.target.attributes.value.nodeValue).subscribe(
     (res)=>{
     
       this.tempArr=res,//category id contain array of one checked
      
      //console.log(this.tempArr),
      this.newArr.push(this.tempArr)
     
      for(let i=0;i<this.newArr.length;i++){
         var firstArray=this.newArr[i];
         for(let i=0;i<firstArray.length;i++){
           var obj=firstArray[i];
          
           this.newProducts.push(obj);
           console.log(this.newProducts);
           
         }//inner for
        
      }//outer for
      
   } );//promise
  
     
      
  
    
    this.categoryselected=0;
   this.newArr=[];
    
  
   }//end if
   else{
     if(this.newArr.length!=0){
      this.newArr.filter((r:any)=>r.productBrandId!==e.target.value)
     }else{
          this.newArr=[];
     }
    
   }
  
}

// هبد
productArr:any[]= [];
Arrays:any[]=[];

getProductUsingInput(){
 this.productArr.push(this.myserviceproduct.GetAllProductsWithOutPagination());
 this.Arrays.push(this.myserviceproduct.GetAllProductsWithOutPagination());//all product
//alert(this.Arrays)
}
tempArr :any= [];
newArr:any=[];
x:any;
onChange(e:any){
   this.Arrays=[];
  
   if(e.target.checked){
    this.x=e.target.attributes.value.nodeValue;
    //console.log(this.x)
    //this.getProductUsingInput();
    
    this.myserviceproduct.GetAllProductsUsingCategoryName(e.target.attributes.name.nodeValue,e.target.attributes.value.nodeValue)
    .subscribe((res)=>{this.Arrays.push(res),
      console.log(this.Arrays),
      this.tempArr.push(res)
     
    },
    (err)=>{console.log(err)})
    console.log(this.tempArr)
    this.productArr=[];
    this.newArr.push(this.tempArr);
    for(let i=0;i<this.newArr.length;i++){
      var firstArray=this.newArr[i];
      for(let i=0;i<firstArray.length;i++){
        var obj=firstArray[i];
        this.productArr.push(obj);
       
      }
      //this.products=this.productArr.filter((e)=>e.productBrandId=e.target.value)
      console.log(this.newArr);
     
    }
    
   }else{
    this.tempArr=this.Arrays.filter((e)=>e.productBrandId!=this.x);
    this.newArr=[];
    this.Arrays=[];
    this.newArr.push(this.tempArr);
    console.log(this.tempArr);
   }
    
    //get all product based on brand id
    
     
   
  
    
  }
  // categoryOnChange($event)
}
