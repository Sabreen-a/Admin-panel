import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SubcategoryService } from 'src/app/services/subcategorysefvice/subcategory.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.css']
})
export class AddsubcategoryComponent implements OnInit {
  subCategory:any;
   check:any;
  // @ViewChild('name') categoryName:any;
  // @ViewChild('id') categoryID:any;
  name:string="";
  id:string="";
  constructor(public myservice:SubcategoryService,private router:Router,private location:Location) {
    this.subCategory={id:0,name:""};
   }

  ngOnInit(): void {
  }
  sayhi(){
    alert("hi");
  }
  Add(){
   
    return  this.myservice.add(this.subCategory).subscribe(
     (result)=>{this.myservice.filter("Register click"),this.subCategory=result,this.check=true,this.myservice.GetAllSubCategory(),this.router.navigate(['/admin/dashboard/subcategory'])},
     (err)=>{console.log(err+"sabreen")}
   );
   
   }
}
