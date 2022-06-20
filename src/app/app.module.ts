import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { ListExComponent } from './list-ex/list-ex.component';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

import { HttpClientModule } from '@angular/common/http';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    DialogExampleComponent,
    ListExComponent
  ],
  entryComponents:[DialogExampleComponent, ListExComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSidenavModule,
    FormsModule,
    FontAwesomeModule,
    MatPaginatorModule,
    MatListModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent, ListExComponent]
})
export class AppModule { }
