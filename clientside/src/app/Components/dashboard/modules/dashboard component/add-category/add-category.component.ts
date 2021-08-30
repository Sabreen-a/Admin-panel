import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  Category:any;
  check:any;
  @ViewChild('name') categoryName:any;
  @ViewChild('id') categoryID:any;
  name:string="";
  id:string="";
  constructor(public myservice:CategoryService,private router:Router,private Location:Location) {
    this.Category={id:0,name:""};
   }
ngAfterViewInit(): void {
  
 
}
  ngOnInit(): void {
  
  }
  sayhi(){
    alert("hi");
  }
  Add(){
   
   return  this.myservice.add(this.Category).subscribe(
    (result)=>{this.myservice.filter("Register click"),this.Category=result,this.check=true,this.myservice.GetAllCategory(),this.router.navigate(['/admin/dashboard/category'])},
    (err)=>{console.log(err+"sabreen")}
  );
  
  }

}
