import { Component, OnInit } from '@angular/core';
import { DashproductserviceService } from 'src/app/services/productdashservice/dashproductservice.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private myserviceproduct:DashproductserviceService) { 
    this.fetchdataproduct();
  }
  products:any;
  ngOnInit(): void {
  }
 
  fetchdataproduct(){
    return this.myserviceproduct.GetAllProduct().subscribe(
      (result)=>{console.log(result),this.products=result},
      (err)=>{console.log(err)}
    )
  }
}
