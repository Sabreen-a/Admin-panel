import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorysubcategory } from 'src/app/datatype/categorysubcategory';
import { CategoryService } from 'src/app/services/category.service';
import { AddCategoryComponent } from '../../add-category/add-category.component';
import { EditCategoryComponent } from '../../edit-category/edit-category.component';

@Component({
  selector: 'app-dashboardcategory',
  templateUrl: './dashboardcategory.component.html',
  styleUrls: ['./dashboardcategory.component.css']
})
export class DashboardcategoryComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator!:MatPaginator;
 category:any;
 y:any;
//dataSource:any;
 myID:any;
 x:Categorysubcategory[]=[];
 dataSource= new MatTableDataSource<Categorysubcategory>(this.x);
  constructor(public dialog: MatDialog,public myservice:CategoryService,private Route:Router,private aciveroute:ActivatedRoute) {
   //alert("constructor");
   this.myID=this.aciveroute.snapshot.params['id'];
   this.myservice.listen().subscribe((m:any)=>{
     console.log(m);
     this.fetchdata();
     alert("y"+this.y)
   })
   }

  ngOnInit(): void {
   
    this.fetchdata();
    
    
  }
  //for pagination
  ngAfterViewInit():void{
    this.dataSource.paginator=this.paginator;
  }
  //to get all category when fetch data
  fetchdata(){
  this.myservice.GetAllCategory().subscribe(
    (result)=>{this.category=result, this.y=result,this.dataSource.data=result as Categorysubcategory[]},
    (err)=>{console.log(err)}
  )
  }

  //to delete one category
  delete(idd:any){
   return this.myservice.Delete(idd).subscribe(
    ()=>{this.fetchdata();this.myservice.filter("Register Click")}
   
   )
  }
  openEditDialog(id:number){
    this.dialog.open(EditCategoryComponent);
    this.myservice.id=id;
    this.Route.navigateByUrl(`/admin/dashboard/category/edit/${id}`);
    //alert(this.myservice.id);
    //this.myservice.filter('Register Click');
    
  }
  openDialog() {
    this.dialog.open(AddCategoryComponent);
    
    
    };

    //filter
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
      
    }

     

 
    displayedColumns: string[] = ['id', 'name','options'];
    
}
