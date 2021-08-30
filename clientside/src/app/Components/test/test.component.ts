import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  sidebaropen=true;
  constructor() { }

  ngOnInit(): void {
    
  }
  sidebarforme(data:any){
    this.sidebaropen=!this.sidebaropen;
  }

}
