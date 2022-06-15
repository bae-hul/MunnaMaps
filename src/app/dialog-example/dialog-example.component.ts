import { Component, OnInit } from '@angular/core';

import {Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';

import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  template: 'passed in {{ data.name }}',
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {

  opened = false;
  faPlusSquare = faPlusSquare;
  faMinusSquare = faMinusSquare;
  faListAlt = faListAlt;
  faEraser = faEraser;
  

  myList = JSON.parse(sessionStorage.getItem('myList'));
  myListLen = JSON.parse(sessionStorage.getItem('myList')).length;
  myListText = "Currently empty! Please click the 'Add to List' button for the boards of your choice to see them here and request a final quote!"
  myListTextDefault = "Currently empty! Please click the 'Add to List' button for the boards of your choice to see them here and request a final quote!";

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) { }

  ngOnInit(): void {
    this.refreshSessionVar();
  }

  addToList(a)
  {
      let index = this.myList.indexOf(a, 0);
      if(index>-1)
      {
        alert("Selected Board already exists in your list!");
      }
      else
      {
        this.myList.push(a);
        this.refreshSessionVar()
      }
  }

  removeFromList(a)
  {
    let index = this.myList.indexOf(a, 0);
    if (index > -1) {
      this.myList.splice(index, 1);
    }
    this.refreshSessionVar()
  }

  refreshSessionVar()
  {
      sessionStorage.setItem('myList',JSON.stringify(this.myList));
      this.myListLen = this.myList.length;

      if (this.myListLen==0)
      {
        this.myListText = this.myListTextDefault;
      }
      else
      {
        this.myListText = '';
      }
  }

  getSessionVar()
  {
    console.log(JSON.parse(sessionStorage.getItem('myList')));
    return JSON.parse(sessionStorage.getItem('myList'));
  }

  clearMyList()
  {
    sessionStorage.setItem('myList',JSON.stringify([]));
    this.myList = [];
    this.refreshSessionVar();
  }

  

}
