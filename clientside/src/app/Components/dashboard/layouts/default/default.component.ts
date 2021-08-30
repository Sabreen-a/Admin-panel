import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  sidebaropen=true;
  
  constructor() { }

  ngOnInit(): void {
  }
  sidebarforme(data:any){
    this.sidebaropen=!this.sidebaropen;
  }
}
