import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { grpc } from '@improbable-eng/grpc-web';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Doctor } from 'src/grpc-web/doctor/doctor_pb';
import { DoctorService } from 'src/grpc-web/doctor/doctor_pb_service';
import { DoctorModel } from 'src/model/doctor';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class DoctorApiService {

  constructor(private env: EnvService) { }

  getAllDoctors(dataSource: MatTableDataSource<DoctorModel>): Array<DoctorModel> {
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
          dataSource.data = doctors;
          console.log("All doctors streamed!");
        } else {
          console.log(code, msg, trailers);
        }
      }
    });
    return doctors;
  }

  addDoctor(newDoctor: DoctorModel, dataSource: MatTableDataSource<DoctorModel>): Array<DoctorModel> {
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
          dataSource.data = doctors;
          console.log("New doctor added!");
        } else {
          console.log(code, msg, trailers);
        }
      }
    });
    return doctors;
  }
}
