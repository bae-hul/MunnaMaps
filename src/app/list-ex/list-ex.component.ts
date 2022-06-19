import {Component, Input, OnInit} from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-list-ex',
  templateUrl: './list-ex.component.html',
  styleUrls: ['./list-ex.component.css']
})
export class ListExComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.ANL = JSON.parse(sessionStorage.getItem('ANL'));
    this.breakpoint = (window.innerWidth <= 770) ? 1 : 2;
  }

  ANL = JSON.parse(sessionStorage.getItem('ANL'));
  breakpoint: any;

  lowValue: number = 0;
  highValue: number = 6;
  

   // used to build a slice of papers relevant at any given time
   public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 770) ? 1 : 2;
  }

}
