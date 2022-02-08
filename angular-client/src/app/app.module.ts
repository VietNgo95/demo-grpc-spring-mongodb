import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { DoctorListComponent } from "./doctor-list/doctor-list.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: "", component: DoctorListComponent }]),
    MatCheckboxModule,
    MatTableModule
  ],
  declarations: [AppComponent, TopBarComponent, DoctorListComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
