import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { CategoryComponent } from './Components/category/category.component';
import { DefaultComponent } from './Components/dashboard/layouts/default/default.component';
import { AddCategoryComponent } from './Components/dashboard/modules/add-category/add-category.component';
import { DashboardComponent } from './Components/dashboard/modules/dashboard/dashboard/dashboard.component';
import { DashboardcategoryComponent } from './Components/dashboard/modules/dashboardcategory/dashboardcategory/dashboardcategory.component';
import { EditCategoryComponent } from './Components/dashboard/modules/edit-category/edit-category.component';
import { AddProductDashboardComponent } from './Components/dashboard/modules/products/add-product-dashboard/add-product-dashboard.component';
import { DashboardproductComponent } from './Components/dashboard/modules/products/dashboardproduct/dashboardproduct.component';
import { EditproductComponent } from './Components/dashboard/modules/products/editproduct/editproduct.component';
import { AddsubcategoryComponent } from './Components/dashboard/modules/subcategory/addsubcategory/addsubcategory/addsubcategory.component';
import { SubcategoryComponent } from './Components/dashboard/modules/subcategory/subcategory/subcategory.component';
import { ErrorComponent } from './Components/error/error.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { SearchComponent } from './Components/search/search.component';


const routes: Routes = [
  {path:'admin',component:DefaultComponent,//https://localhost:4200/admin
  //childern for admin
   children:[
   { path:'dashboard',component:DashboardComponent,//https://localhost:4200/admin/dashboard
    children:[{
    path:'edit/{id}',component:EditCategoryComponent}]},
  {
    path:'dashboard/product',
    component:DashboardproductComponent
  ,children:[{path:'edit/:id',component:EditproductComponent},{path:'dashboard/product/add',component:AddProductDashboardComponent}
]},
  {path:'dashboard/category',component:DashboardcategoryComponent,
  children:[{path:'edit/:id',component:DashboardcategoryComponent}]},

  {path:'dashboard/category/add',component:AddCategoryComponent},


  //*****subcategory routing**** */
  {path:'dashboard/subcategory',component:SubcategoryComponent,
  children:[{path:'edit/:id',component:SubcategoryComponent}]},

  {path:'dashboard/subcategory/add',component:AddsubcategoryComponent},

]},//childern admin

  
  {path:'',component:DashboardcategoryComponent}, //https://localhost:4200
  {path:'category/:name/:id',component:CategoryComponent}, //http://localhost:4200/category/id
  {path:'category/:id',component:CategoryComponent},//http://localhost:4200/categoryid
  {path:'product/:id',component:ProductDetailsComponent}, //https://localhost:4200/products/id
  {path:'cart',component:CartComponent}, //https:localhost:4200/cart
  {path:'search/:id',component:SearchComponent}, //https:localhost:4200/search/id
  // {path:'**',component:ErrorComponent}, //https:localhost:4200/search/id


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }







