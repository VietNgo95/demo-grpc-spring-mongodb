@echo off
cd ../grpc-web
rmdir . /q /s
mkdir doctor
protoc -I=../proto doctor.proto --js_out=import_style=commonjs+dts:./doctor/ --grpc-web_out=import_style=typescript,mode=grpcwebtext:./doctor/