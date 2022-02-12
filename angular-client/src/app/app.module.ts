import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";

import { EnvServiceProvider } from "./services/env.service.provider";
import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { DoctorListComponent } from "./doctor-list/doctor-list.component";
import { DocterAddComponent } from './docter-add/docter-add.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: "", component: DoctorListComponent }]),
    MatCheckboxModule,
    MatTableModule
  ],
  declarations: [AppComponent, TopBarComponent, DoctorListComponent, DocterAddComponent],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
