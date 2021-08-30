import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ModuleReference } from 'typescript';
import { DashboardcategoryComponent } from '../dashboardcategory/dashboardcategory/dashboardcategory.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  myID:any;
  Category:any;
  check:any;
  @ViewChild('name') categoryName:any;
  @ViewChild('id') categoryID:any;
  name:string="";
  id:string="";
  constructor(private myservice:CategoryService,private activeRoute:ActivatedRoute,private router:Router,private dialogRef:MatDialogRef<EditCategoryComponent>) { 
    this.check=true;
    //this.myservice.listen();
  }

  ngOnInit(): void {
    this.myID=this.myservice.id;
    //alert(this.myservice.id)
  }
  Edit(name:string,id:string){
   let myCategory:{name:string,id:string}={
     name:name,
     id:this.myservice.id
   }
   //alert(this.myservice.id)
   return this.myservice.Edit(this.myservice.id,myCategory).subscribe(
     (result)=>{this.router.navigateByUrl('/admin/dashboard/category'),this.myservice.filter('Register Click'),console.log(result),this.dialogRef.close()},
     (err)=>{console.log(err)}
   )
  }
  ngAfterViewInit(): any {
    return this.myservice.GetCategoryById(this.myservice.id).
    subscribe(
      (data)=>{
        this.Category=data,
        this.categoryName.nativeElement.value=this.Category.name;
        this.categoryID.nativeElement.value=this.activeRoute.snapshot.params["id"];
        console.log(data)},
      (err)=>console.log(err)
      );
}
//to close dialog
close(){
  this.dialogRef.close();
  this.router.navigateByUrl('/admin/dashboard/category');
}
}
