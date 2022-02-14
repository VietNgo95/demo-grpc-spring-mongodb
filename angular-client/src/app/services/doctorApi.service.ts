import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { DoctorModel } from 'src/model/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorApiService {

  private doctorSubject = new BehaviorSubject([]);
  readonly doctors$ = this.doctorSubject.asObservable();
  public selectedDoctors$ = new Array<DoctorModel>();

  constructor(private env: EnvService, private http: HttpClient) { }

  getAllDoctors(): Array<DoctorModel> {
    const url = `http://${this.env.springHost}:${this.env.springPort}/rest/doctors/`;
    let position = 1;
    let doctors = new Array<DoctorModel>();
    this.http.get<Array<DoctorModel>>(url).forEach(response => {
      response.forEach(doctor => {
        doctors.push(
          <DoctorModel>({
            id: doctor.id,
            position: position++,
            name: doctor.name,
            age: doctor.age
          }));
        });
      this.doctorSubject.next(Object.assign([], doctors));
    });
    return doctors;
  }

  addDoctor(newDoctor: DoctorModel): void {
    const url = `http://${this.env.springHost}:${this.env.springPort}/rest/doctors/`;
    const createDoctorRequest = <DoctorModel>({
      name: newDoctor.name,
      age: newDoctor.age
    });

    this.http.post<DoctorModel>(url, createDoctorRequest).subscribe(doctor => {
        this.getAllDoctors();
    });
  }

  deleteDoctors() {
    const url = `http://${this.env.springHost}:${this.env.springPort}/rest/doctors/`;
    const headerDict = {};
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    for (let deleteDoctor of this.selectedDoctors$) {
      this.http.delete(url.concat(deleteDoctor.id), requestOptions).subscribe({
        next: data => {
          console.log(`Deleted doctor: name=${deleteDoctor.name}, age=${deleteDoctor.age}`);
          this.getAllDoctors();
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  }
}
