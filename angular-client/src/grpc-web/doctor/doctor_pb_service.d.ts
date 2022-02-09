// package: grpc
// file: doctor.proto

import * as doctor_pb from "./doctor_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type DoctorServicegetAllDoctor = {
  readonly methodName: string;
  readonly service: typeof DoctorService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof doctor_pb.Doctor;
};

type DoctorServicecreateDoctor = {
  readonly methodName: string;
  readonly service: typeof DoctorService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof doctor_pb.Doctor;
  readonly responseType: typeof doctor_pb.Doctor;
};

export class DoctorService {
  static readonly serviceName: string;
  static readonly getAllDoctor: DoctorServicegetAllDoctor;
  static readonly createDoctor: DoctorServicecreateDoctor;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class DoctorServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getAllDoctor(requestMessage: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata): ResponseStream<doctor_pb.Doctor>;
  createDoctor(requestMessage: doctor_pb.Doctor, metadata?: grpc.Metadata): ResponseStream<doctor_pb.Doctor>;
}

