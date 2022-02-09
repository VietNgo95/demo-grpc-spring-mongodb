// package: grpc
// file: doctor.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Doctor extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getAge(): number;
  setAge(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Doctor.AsObject;
  static toObject(includeInstance: boolean, msg: Doctor): Doctor.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Doctor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Doctor;
  static deserializeBinaryFromReader(message: Doctor, reader: jspb.BinaryReader): Doctor;
}

export namespace Doctor {
  export type AsObject = {
    id: string,
    name: string,
    age: number,
  }
}

