import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import{ MatSidenavModule} from '@angular/material/sidenav';
import { MockMatchMediaProvider } from '@angular/flex-layout/core/typings/match-media';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import{MatCardModule} from '@angular/material/card';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DashboardComponent } from '../../modules/dashboard/dashboard/dashboard.component';
import { DashboardproductComponent} from '../../modules/products/dashboardproduct/dashboardproduct.component';
import { DashboardcategoryComponent } from '../../modules/dashboardcategory/dashboardcategory/dashboardcategory.component';
import { AddProductDashboardComponent } from '../../modules/products/add-product-dashboard/add-product-dashboard.component';
import { AddCategoryComponent } from '../../modules/add-category/add-category.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { SubcategoryComponent } from '../../modules/subcategory/subcategory/subcategory.component';
import { AddsubcategoryComponent } from '../../modules/subcategory/addsubcategory/addsubcategory/addsubcategory.component';
import { EditsubcategoryComponent } from '../../modules/subcategory/editsubcategory/editsubcategory/editsubcategory.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { EditproductComponent } from '../../modules/products/editproduct/editproduct.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    DashboardcategoryComponent,
    DashboardproductComponent,
    AddProductDashboardComponent,
    AddCategoryComponent,
    SubcategoryComponent,
    AddsubcategoryComponent,
    EditsubcategoryComponent,
    EditproductComponent,
   
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule ,
    MatFormFieldModule,
    
   
    MatRippleModule,
   
  ],providers:[
    
  ]
})
export class DefaultModule { }
