import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './Components/products/product.component';
import { EditCategoryComponent } from './Components/dashboard/modules/edit-category/edit-category.component';
import { FormsModule } from '@angular/forms';
import { DefaultModule } from './Components/dashboard/layouts/default/default.module';
import { SearchComponent } from './Components/search/search.component';
import { HeaderComponent } from './Components/header/header.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CartComponent } from './Components/cart/cart.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
import { CategoryComponent } from './Components/category/category.component';
import { ErrorComponent } from './Components/error/error.component';
//pagination model
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    EditCategoryComponent,
    CartComponent,
    ProductDetailsComponent,
    HeaderComponent,
    SearchComponent,
    LandingPageComponent,
    CategoryComponent,
    ErrorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    DefaultModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OwlModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
