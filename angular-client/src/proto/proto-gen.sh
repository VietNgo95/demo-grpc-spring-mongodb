#!/bin/bash
cd ../grpc-web
rm -rf ./*
mkdir doctor
protoc -I=../proto doctor.proto --js_out=import_style=commonjs:./doctor/ --grpc-web_out=import_style=typescript,mode=grpcwebtext:./doctor/