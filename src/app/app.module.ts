import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import {MatSidenavModule} from '@angular/material/sidenav';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DialogExampleComponent
  ],
  entryComponents:[DialogExampleComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSidenavModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
