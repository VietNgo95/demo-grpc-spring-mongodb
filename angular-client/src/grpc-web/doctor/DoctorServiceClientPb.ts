/**
 * @fileoverview gRPC-Web generated client stub for grpc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as doctor_pb from './doctor_pb';


export class DoctorServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorgetAllDoctor = new grpcWeb.MethodDescriptor(
    '/grpc.DoctorService/getAllDoctor',
    grpcWeb.MethodType.SERVER_STREAMING,
    google_protobuf_empty_pb.Empty,
    doctor_pb.Doctor,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    doctor_pb.Doctor.deserializeBinary
  );

  getAllDoctor(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<doctor_pb.Doctor> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/grpc.DoctorService/getAllDoctor',
      request,
      metadata || {},
      this.methodDescriptorgetAllDoctor);
  }

  methodDescriptorcreateDoctor = new grpcWeb.MethodDescriptor(
    '/grpc.DoctorService/createDoctor',
    grpcWeb.MethodType.SERVER_STREAMING,
    doctor_pb.Doctor,
    doctor_pb.Doctor,
    (request: doctor_pb.Doctor) => {
      return request.serializeBinary();
    },
    doctor_pb.Doctor.deserializeBinary
  );

  createDoctor(
    request: doctor_pb.Doctor,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<doctor_pb.Doctor> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/grpc.DoctorService/createDoctor',
      request,
      metadata || {},
      this.methodDescriptorcreateDoctor);
  }

}

