import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DashproductserviceService } from 'src/app/services/productdashservice/dashproductservice.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  myID:any;
  Product:any;
  check:any;
  @ViewChild('Name') Name:any;
  @ViewChild('ProductBrandId') ProductBrandId:any;
  @ViewChild('ProductTypeId') ProductTypeId:any;
  @ViewChild('id') prodID:any;
  @ViewChild('img') myimg:any;
  @ViewChild('Qount') Qount:any;
  @ViewChild('price') price:any;
  name:string="";
  id:string="";
  constructor(private myservice:DashproductserviceService,private activeRoute:ActivatedRoute,private router:Router,private dialogRef:MatDialogRef<EditproductComponent>) { 
    this.check=true;
  }

  ngOnInit(): void {
    this.myID=this.myservice.id;
  }
  Edit(Name:string,qount:string,price:string,ProductTypeId:string,ProductBrandId:string,id:string){
    let myproduct:{Name:string,qount:string,price:string,ProductTypeId:string,ProductBrandId:string,id:string}={
      Name:Name,
      qount:this.Product.qount,
      price:this.Product.price,
      ProductTypeId:ProductTypeId,
      ProductBrandId:ProductBrandId,
      id:this.myservice.id
      
      
      //myimg:myimg
    }
    return this.myservice.Edit(this.myservice.id,myproduct).subscribe(
      (result)=>{this.router.navigateByUrl('/admin/dashboard/product'),
      this.myservice.filter('Register Click'),console.log(result),
      this.dialogRef.close()
      //alert("edit")
    },
      (err)=>{console.log(err)}
    )
    // alert("edit");
  }
  ngAfterViewInit(): any {
    return this.myservice.GetProductById(this.myservice.id).
    subscribe(
      (data)=>{
        this.Product=data,
        this.prodID.nativeElement.value=this.Product.id;
        this.Name.nativeElement.value=this.Product.name;
        this.ProductBrandId.nativeElement.value=this.Product.ProductBrandId;
        this.ProductTypeId.nativeElement.value=this.Product.ProductTypeId;
        this.Qount.nativeElement.value=this.Product.qount;
        this.prodID.nativeElement.value=this.myservice.id;
        this.price.nativeElement.value=this.Product.price;
        
        //this.activeRoute.snapshot.params["id"];
        console.log(data)},
      (err)=>console.log(err)
      );
}
}
