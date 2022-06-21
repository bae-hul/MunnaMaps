import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

import { CommonService } from "../common/common-service";
import { Subscription } from 'rxjs';

var gdialog;
var openIW = null;

@Component({
  selector: 'app-list-ex',
  templateUrl: './list-ex.component.html',
  styleUrls: ['./list-ex.component.css']
})
export class ListExComponent implements OnInit {

  public sessionStorage = sessionStorage;

  messageReceived: any;
  private subscriptionName: Subscription; //important to create a subscription

  constructor(public dialog:MatDialog, private Service: CommonService) 
  { 
    gdialog = this.dialog; 
    
    // subscribe to sender component messages
    this.subscriptionName= this.Service.getUpdate().subscribe
    (message => { //message contains the data sent from service
    this.messageReceived = message;
    //alert("Message Recieved!");
    this.ngOnInit();
    });
  }

  openDialog(dtext)
    {
        //let stext = dtext.substring(46, dtext.length-10)
        console.log("Inside open diag");
        gdialog.open(DialogExampleComponent,{
            data: {name: dtext},
        });
    }

  ngOnInit(): void {
    this.ANL = JSON.parse(sessionStorage.getItem('ANL'));
    this.breakpoint = (window.innerWidth <= 770) ? 1 : 2;

  }

  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.subscriptionName.unsubscribe();
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

  onCardClick(data){
    this.openDialog(data);
  }

  doThis()
  {
    console.log('kek');
  }

}
