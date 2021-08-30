import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-Dashboardheader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Output() togglesidebarforme: EventEmitter<any>=new EventEmitter();
  constructor() { }

  ngOnInit() {

  }
  togglesidebar(){
    this.togglesidebarforme.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
