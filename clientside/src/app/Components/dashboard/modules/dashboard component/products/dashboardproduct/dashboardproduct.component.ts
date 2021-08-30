import { DataSource } from '@angular/cdk/collections';
import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { ChangeDetectorRef, Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { Categorysubcategory } from 'src/app/datatype/categorysubcategory';

import { Iproduct } from 'src/app/datatype/iproduct';
import { MyProduct } from 'src/app/datatype/my-product';
import { DashproductserviceService } from 'src/app/services/productdashservice/dashproductservice.service';
import { SubcategoryService } from 'src/app/services/subcategorysefvice/subcategory.service';
import { AddProductDashboardComponent } from '../add-product-dashboard/add-product-dashboard.component';
import { EditproductComponent } from '../editproduct/editproduct.component';


@Component({
  selector: 'app-dashboardproduct',
  templateUrl: './dashboardproduct.component.html',
  styleUrls: ['./dashboardproduct.component.css']
})
export class DashboardproductComponent implements OnInit {

  //variable declaration
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  
  
 
  x:MyProduct[]=[];
   y:any;
   myID:any;
  dataSource= new MatTableDataSource<any>(this.x);
  //dataSource:MatTableDataSource<MyProduct>;
  
    constructor(private cd: ChangeDetectorRef,public dialog: MatDialog,private myservice:DashproductserviceService,private Route:Router,private aciveroute:ActivatedRoute) {
      this.myID=this.aciveroute.snapshot.params['id'];
      this.myservice.listen().subscribe((m:any)=>{
      console.log(m);
      this.fetchdata();
      
      
    })
     
     this.dataSource=new MatTableDataSource<MyProduct>();
     }
  
    ngOnInit() {
     this.fetchdata();
     
    }
    ngAfterViewInit(): void {
      this.dataSource.paginator=this.paginator;
     
    }
    //to get all category when fetch data
    fetchdata(){
    this.myservice.GetAllProductsWithOutPagination().subscribe(
      (result)=>{
        
       // this.dataSource.data=result as Iproduct[],
       this.dataSource.data=result as any[]
        console.log(result+"result in fetch"),
        console.log(this.dataSource.data+"fetch"),
        console.log(JSON.stringify(this.y)+"y succeed")
        
      },
        (err)=>{console.log(err+"erro sabreen")}
       
     
    )
    
    }
  
    //to delete one category
    delete(idd:any){
     return this.myservice.Delete(idd).subscribe(
      ()=>{this.fetchdata();this.myservice.filter("Register Click"),alert("deleted")}
     
     )
    }
    openEditDialog(id:number){
      this.dialog.open(EditproductComponent);
      this.myservice.id=id;
      this.Route.navigateByUrl(`/admin/dashboard/product/edit/${id}`);
      //alert(this.myservice.id);
      this.myservice.filter('Register Click');
      
    }
    openDialog() {
      this.dialog.open(AddProductDashboardComponent);
      // alert(this.myservice.dbset2);
      // this.dataSource.data=this.myservice.dbset2 as MyProduct[];
      //alert("this.datasource"+this.dataSource.data);
      };

      //filter
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
      
    }
/*********habd******** */

    //displayedColumns: string[] = ['id','name','price','description','pictureUrl','rating','qount','date_Experied','comment','productTypeId','productBrandId','options'];
    displayedColumns: string[] =['id','name','qount','price','productType','productBrand','options']
  }
  
    
   
    


