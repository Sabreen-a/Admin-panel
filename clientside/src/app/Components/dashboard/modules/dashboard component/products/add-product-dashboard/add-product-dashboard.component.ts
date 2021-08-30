import { DatePipe, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules, analyzeFile } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MyProduct } from 'src/app/datatype/my-product';
import { CategoryService } from 'src/app/services/category.service';
import { DashproductserviceService } from 'src/app/services/productdashservice/dashproductservice.service';
import { SubcategoryService } from 'src/app/services/subcategorysefvice/subcategory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product-dashboard',
  templateUrl: './add-product-dashboard.component.html',
  styleUrls: ['./add-product-dashboard.component.css'],
  providers: [DatePipe]
})
export class AddProductDashboardComponent implements OnInit {

  //for inuput category brand disabled
 disabled:boolean=true;
//selectedFiles!:File[];
selectedFiles:any;
 product:any;
 check:boolean=false;
 categoryList:any={id:0,cname:""};
 subcategoryList:any={id:0,subname:""};
 //productImg:string="/assets/img/default.jpg";
 productImg:any;
 productImg1:any;
  fileToUpload:any;
  myimg: any;
  date:any=new Date();
  latestDate:any;
  /*******************form */
 createdform!:FormGroup;
 
 constructor(private subCategoryService:SubcategoryService,private client :HttpClient,private categoryservice:CategoryService,public datePipe:DatePipe,public myservice:DashproductserviceService,private router:Router,private loc:Location) {
   //biding with form
   this.createdform =new FormGroup({
     ProductTypeId:new FormControl('', Validators.required),
     ProductBrandId:new FormControl('', Validators.required),
     picturGallaryFils:new FormControl('', Validators.required),
     PictureUrl:new FormControl('', Validators.required),
     Price:new FormControl(),
     Name:new FormControl('', Validators.required),
     Qount:new FormControl(),
     Description:new FormControl()

  })
   //date
  this.latestDate=this.datePipe.transform(this.date,"yyyy-MM-ddThh:mm");
  //fillselect category
  this.fillSelectItem();
  

  //fil sub category
  this.fillSelectsubcategoryItem();
 
  
    
    
  
  }

  ngOnInit(): void {
    
  }
  
  
  //to upload one image in table product
    handleFileInput(file:FileList){
      this.fileToUpload=file.item(0);
      
      //var image preview
      var reader=new FileReader();
      reader.onload=(event:any)=>{
        this.productImg =event.target.result;
        
      }
     reader.readAsDataURL(this.fileToUpload);
     
      console.log(this.fileToUpload);//file
      
      
    }
    filestoupload:any;
    //to upload more than one image
    urls:any[]=[];
    
   
    selectedFile:any;
   
     /**************new */
    
     handleFileInput2(file:any){
     this.selectedFile=<File>file.target.files[0];
     var reader=new FileReader();
     reader.onload=(event:any)=>{
       this.productImg =event.target.result;
       
     }
    reader.readAsDataURL(this.selectedFile);
     
     }
     result:any[]=[];
     onselect2(file2:any){
     if(file2.target.files){
      for(var i=0;i<File.length;i++){
         var reader=new FileReader();//read our uploaded file
        this.filestoupload=file2.target.files[i]
        reader.readAsDataURL(file2.target.files[i]);
         reader.onload=(event:any)=>{
          this.result.push(event.target.result);
          //this.urls.push(file2.target.files[i]);
          this.urls.push(event.target.result);
          console.log(this.urls);
        }//for
      }//if
        this.selectedFiles+=<FileList>file2.target.files[i];
        //this.urls.push(this.selectedFiles);
      
        
        
      }
      
      this.selectedFiles=<FileList>file2.target.files;
     
    }
    //variable to refer to column pictrue gallery in from data
      pictureGallery:any;
      picUrl:any[]=[];
      picturesarra:any;

     onSubmit(data:any){
      
       
      
       const formData=new FormData();   
       formData.append('PictureUrl',this.selectedFile);

       //to load more than one file in our database
       let files: File[]=this.selectedFiles;
      //let myFormData: FormData = new FormData();

      for (let i = 0; i < files.length; i++) {
        let file: File = files[i];
       // formData.append('file', file, file.name);
        formData.append('picturGallaryFils', file, file.name);    // the filed name is `files` because the server side declares a `Files` property
      }
      this.picturesarra=this.picUrl;
       console.log("picurls"+this.picUrl);
      // formData.append('pictureGallery',this.urls);
       //console.log("selected single file"+this.selectedFiles[0])
       console.log(this.selectedFiles);
       console.log("file"+this.selectedFile)
       formData.append('Description',data.Description);
       formData.append('ProductTypeId',this.submodifiedText);
       formData.append('ProductBrandId',this.modifiedText);
       formData.append('Name',data.Name);
      formData.append('Qount',data.Qount)
       formData.append('Price',data.Price)
      

       this.myservice.add(formData).subscribe((result)=>{this.myservice.filter("Register click"),alert("added"),this.product=result,this.check=true,this.myservice.GetAllProduct(),this.router.navigate(['/admin/dashboard/product'])},
       (err)=>console.log(err))
     }
  //fillselect category
  fillSelectItem(){
  this.categoryservice.GetAllCategory().subscribe(
    (result)=>{this.categoryList=result
     
     },
    (err)=>{console.log(err)}
  )
 }
arraysubcategorlist:any[]=[];
 //fill subcategory list
 fillSelectsubcategoryItem(){
  this.subCategoryService.GetAllSubCategory().subscribe(
    (result)=>{this.subcategoryList=result},
     
    (err)=>{console.log(err)},
   
  )
 }

//handle onchange select for category and sub category
categoryselected:Number=0;//default value

categories:any[]=[];


modifiedText:any;
categoryNamelistusingID:any;
//select 
onCategorySelected(val:any){
  //web api
console.log(this.categoryselected);

this.customFunction(val);

this.categoryservice.GetCategoryById(val).subscribe(
  (result)=>{this.categoryNamelistusingID=result,console.log(this.categoryNamelistusingID)},
  (err)=>{console.log(err)}
)
}
//to get idvalue from name of category
customFunction(val:any){
  //this.modifiedText=val//categorid
  this.modifiedText=val.target.options.selectedIndex;
}
//handle change on subcategory
subcategoryselected:Number=0;//default value
products:any[]=[];
submodifiedText:any;
subcategoryNameListUsinID:any;

//to get id value for subcategory
customSubFunction(val:any){
 
  this.submodifiedText=val.target.options.selectedIndex;
}
onsubcategorySelected(val:any){
  //web api

this.customSubFunction(val);
this.subCategoryService.GetSubCategoryById(val).subscribe(
  (result)=>{this.subcategoryNameListUsinID=result,console.log(this.subcategoryNameListUsinID)},
  (err)=>{console.log(err)}
)
}
  
}
