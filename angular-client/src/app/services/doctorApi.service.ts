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

  private proxyHost: string;
  private proxyPort: string;

  constructor(env: EnvService) {
    this.proxyHost = env.envoyHost;
    this.proxyPort = env.envoyPort;
  }

  getAllDoctors(dataSource: MatTableDataSource<DoctorModel>): Array<DoctorModel> {
    const getAllDoctorRequest = new Empty();
    let position = 1;
    let doctors = new Array<DoctorModel>();
    grpc.invoke(DoctorService.getAllDoctor, {
      request: getAllDoctorRequest,
      host: `http://${this.proxyHost}:${this.proxyPort}`,
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
}
