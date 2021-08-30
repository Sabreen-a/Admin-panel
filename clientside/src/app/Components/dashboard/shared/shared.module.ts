import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import{MatDividerModule} from '@angular/material/divider';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import{MatButtonModule} from '@angular/material/button';
import{MatListItem, MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { CardComponent } from './widgets/card/card.component';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
   
    CardComponent,
    
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    
    
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    CardComponent,
    
  ]
})
export class SharedModule { }
