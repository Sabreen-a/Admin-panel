import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 visible:boolean=true
 productvisible:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }
show(){
  this.visible=!this.visible;
}
}
