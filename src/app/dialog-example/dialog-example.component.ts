import { Component, OnInit } from '@angular/core';

import {Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  template: 'passed in {{ data.name }}',
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {

  opened = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) { }

  ngOnInit(): void {
  }

}
