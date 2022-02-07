import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: DoctorListComponent },
    ]),
    MaterialModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    DoctorListComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
