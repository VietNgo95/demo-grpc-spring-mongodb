import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class Doctor extends jspb.Message {
  getId(): string;
  setId(value: string): Doctor;

  getName(): string;
  setName(value: string): Doctor;

  getAge(): number;
  setAge(value: number): Doctor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Doctor.AsObject;
  static toObject(includeInstance: boolean, msg: Doctor): Doctor.AsObject;
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

