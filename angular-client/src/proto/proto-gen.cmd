@echo off
cd ../grpc-web
rmdir . /q /s
mkdir doctor

@rem use your own absolute path example: "C:\app\node_modules\.bin..."
set PROTOC_GEN_TS_PATH="{ABSOLUTEPATH}\node_modules\.bin\protoc-gen-ts.cmd"
@rem use relative path on this one
set OUT_DIR="./../grpc-web/doctor"
cd ./../proto/
protoc --plugin="protoc-gen-ts=%PROTOC_GEN_TS_PATH%" --js_out="import_style=commonjs,binary:%OUT_DIR%" --ts_out="service=grpc-web:%OUT_DIR%" doctor.proto