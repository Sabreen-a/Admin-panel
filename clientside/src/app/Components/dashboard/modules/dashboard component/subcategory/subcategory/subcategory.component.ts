import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorysubcategory } from 'src/app/datatype/categorysubcategory';
import { SubcategoryService } from 'src/app/services/subcategorysefvice/subcategory.service';
import { AddsubcategoryComponent } from '../addsubcategory/addsubcategory/addsubcategory.component';
import { EditsubcategoryComponent } from '../editsubcategory/editsubcategory/editsubcategory.component';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit,AfterViewInit {

  //variable declaration
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  category:any;
  x:Categorysubcategory[]=[];
  dataSource= new MatTableDataSource<Categorysubcategory>(this.x);
  myID:any;
  
  constructor(public dialog: MatDialog,public myservice:SubcategoryService,private Route:Router,private aciveroute:ActivatedRoute) {
    //alert("constructor");
    this.myID=this.aciveroute.snapshot.params['id'];
    this.myservice.listen().subscribe((m:any)=>{
      console.log(m);
      this.fetchdata();
    })
    }

  //for pagination
  ngAfterViewInit():void{
    this.dataSource.paginator=this.paginator;
  }

    ngOnInit(): void {
   
      this.fetchdata();
    }
    //to get all category when fetch data
    fetchdata(){
    this.myservice.GetAllSubCategory().subscribe(
      (result)=>{this.category=result,this.dataSource.data=result as Categorysubcategory[]},
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
     this.dialog.open(EditsubcategoryComponent);
     this.myservice.id=id;
     this.Route.navigateByUrl(`/admin/dashboard/subcategory/edit/${id}`);
     //alert(this.myservice.id);
     //this.myservice.filter('Register Click');
     
   }
   openDialog() {
     this.dialog.open(AddsubcategoryComponent);
     
     
     };
     //filter
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
      
    }
    
     displayedColumns: string[] = ['id', 'name','options'];
     

}
