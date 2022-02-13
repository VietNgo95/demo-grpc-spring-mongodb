import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorModel } from 'src/model/doctor';
import { DoctorApiService } from '../services/doctorApi.service';

@Component({
  selector: 'app-docter-add',
  templateUrl: './docter-add.component.html',
  styleUrls: ['./docter-add.component.css']
})
export class DocterAddComponent implements OnInit {

  public addDoctorForm: FormGroup;
  private newDoctor: DoctorModel | undefined;

  constructor(private formBuilder: FormBuilder, private apiServide: DoctorApiService) {
    this.addDoctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['']
    });
  }

  ngOnInit(): void {
  }

  preventChars(e: KeyboardEvent) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }

  clickAdd() {
    let name = this.addDoctorForm.get('name')?.value;
    if (name) {
      this.newDoctor = <DoctorModel>({
        name: name,
        age: this.addDoctorForm.get('age')?.value
      })
      console.log(this.newDoctor);
      this.apiServide.addDoctor(this.newDoctor);
    }
  }

  clickDelete() {
    /** REST call block by CORS policy: Response to preflight request 
     * doesn't pass access control check: 
     * No 'Access-Control-Allow-Origin' header is present on the requested resource.
     */
    this.apiServide.deleteDoctors();
  }
}
