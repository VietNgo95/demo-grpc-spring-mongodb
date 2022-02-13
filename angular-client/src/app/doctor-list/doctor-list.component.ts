import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DoctorModel } from 'src/model/doctor';
import { DoctorApiService } from '../services/doctorApi.service';
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'name', 'age'];
  dataSource = new MatTableDataSource<DoctorModel>();
  selection = new SelectionModel<DoctorModel>(true, []);

  constructor(private apiService: DoctorApiService) { }

  ngOnInit(): void {
    this.apiService.doctors$.subscribe(data => {
      this.dataSource.data = data;
      this.selection.clear();
    })
    this.apiService.selectedDoctors$ = this.selection.selected;
    this.apiService.getAllDoctors();
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
    } else {
      this.selection.select(...this.dataSource.data);
    }
    this.apiService.selectedDoctors$ = this.selection.selected;
  }

  /** Toggle selected row. */
  rowToggle(row: DoctorModel) {
    this.selection.toggle(row);
    this.apiService.selectedDoctors$ = this.selection.selected;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DoctorModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}