import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { grpc } from '@improbable-eng/grpc-web';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Doctor } from 'src/grpc-web/doctor/doctor_pb';
import { DoctorService } from 'src/grpc-web/doctor/doctor_pb_service';
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
    const getAllDoctorRequest = new Empty();
    let position = 1;
    let doctors = new Array<DoctorModel>();
    grpc.invoke(DoctorService.getAllDoctor, {
      request: getAllDoctorRequest,
      host: `http://${this.env.envoyHost}:${this.env.envoyPort}`,
      onMessage: (message: Doctor) => {
        let doctor = message.toObject() as Doctor.AsObject;
        doctors.push(
          <DoctorModel>({
            id: doctor.id,
            position: position++,
            name: doctor.name,
            age: doctor.age
          }));
      },
      onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
        if (code === grpc.Code.OK) {
          this.doctorSubject.next(Object.assign([], doctors));
          console.log("All doctors streamed!");
        } else {
          console.error(code, msg, trailers);
        }
      }
    });
    return doctors;
  }

  addDoctor(newDoctor: DoctorModel): void {
    console.log(this.selectedDoctors$);
    const createDoctorRequest = new Doctor();
    createDoctorRequest.setName(newDoctor.name);
    createDoctorRequest.setAge(newDoctor.age);
    let position = 1;
    let doctors = new Array<DoctorModel>();

    grpc.invoke(DoctorService.createDoctor, {
      request: createDoctorRequest,
      host: `http://${this.env.envoyHost}:${this.env.envoyPort}`,
      onMessage: (message: Doctor) => {
        let doctor = message.toObject() as Doctor.AsObject;
        doctors.push(
          <DoctorModel>({
            id: doctor.id,
            position: position++,
            name: doctor.name,
            age: doctor.age
          }));
      },
      onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
        if (code === grpc.Code.OK) {
          doctors.reverse();
          this.doctorSubject.next(Object.assign([], doctors));
          console.log("New doctor added!");
        } else {
          console.error(code, msg, trailers);
        }
      }
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
