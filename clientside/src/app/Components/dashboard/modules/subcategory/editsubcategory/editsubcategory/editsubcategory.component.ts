import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SubcategoryService } from 'src/app/services/subcategorysefvice/subcategory.service';

@Component({
  selector: 'app-editsubcategory',
  templateUrl: './editsubcategory.component.html',
  styleUrls: ['./editsubcategory.component.css']
})
export class EditsubcategoryComponent implements OnInit {
  myID:any;
  Category:any;
  check:any;
  @ViewChild('name') categoryName:any;
  @ViewChild('id') categoryID:any;
  name:string="";
  id:string="";
  constructor(private myservice:SubcategoryService,private activeRoute:ActivatedRoute,private router:Router,private dialogRef:MatDialogRef<EditsubcategoryComponent>) { 
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
     (result)=>{this.router.navigateByUrl('/admin/dashboard/subcategory'),this.myservice.filter('Register Click'),console.log(result),this.dialogRef.close()},
     (err)=>{console.log(err)}
   )
  }
  ngAfterViewInit(): any {
    return this.myservice.GetSubCategoryById(this.myservice.id).
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
  this.router.navigateByUrl('/admin/dashboard/subcategory');
}

}
