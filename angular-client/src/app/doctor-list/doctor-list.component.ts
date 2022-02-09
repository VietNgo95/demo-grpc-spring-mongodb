import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DoctorModel } from 'src/model/doctor';
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { Doctor } from 'src/grpc-web/doctor/doctor_pb';
import { DoctorService } from 'src/grpc-web/doctor/doctor_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'name', 'age'];
  doctors: DoctorModel[] = new Array<DoctorModel>();
  dataSource = new MatTableDataSource<DoctorModel>();
  selection = new SelectionModel<DoctorModel>(true, []);

  ngOnInit(): void {
    const getAllDoctorRequest = new Empty();
    const proxyPort = '8090';
    let position = 1;
    grpc.invoke(DoctorService.getAllDoctor, {
      request: getAllDoctorRequest,
      host: 'http://localhost:' + proxyPort,
      onMessage: (message: Doctor) => {
        let doctor = message.toObject() as Doctor.AsObject;
        this.doctors.push(
          <DoctorModel>({
            id: doctor.id,
            position: position++,
            name: doctor.name,
            age: doctor.age
          }));
      },
      onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
        if (code === grpc.Code.OK) {
          this.dataSource.data = this.doctors;
          console.log("All doctors streamed!");
        } else {
          console.log(code, msg, trailers);
        }
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DoctorModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}