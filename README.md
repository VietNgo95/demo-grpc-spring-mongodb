# gRPC with Spring and MongoDB
Personal project to demonstrate uses of spring and gRPC.

## Database setup
This project connect to the free tier M0 of [MongoDB Atlas](https://www.mongodb.com/atlas/database).
You can use any others DBMS that supports Spring Boot.
Config the connection string in `application.properties` file, example in this project:
`spring.data.mongodb.uri=mongodb+srv://<username>:<pwd>@<cluster>.mongodb.net`

Learn more about Spring with MongoDB [here](https://www.mongodb.com/compatibility/spring-boot).

## Backend setup
### Prerequisite
 - Java 8 and above
 - Maven
### 1. Build grpc-interface
After change the connection string, build this project with `mvn install`
This will generate any proto files to java code and export a jar file use in the spring-mongodb-service project.

### 2. Build spring-mongodb-service
Build with `mvn install`
Optionaly, after build you can check if it can run with `mvn spring-boot run`

Check if there if there is any builded jar in `/target/` folder.

## Local deployment
### Prerequisite
- Install [Docker](https://docs.docker.com/engine/install/)

### Deploy steps
Step 1: Move to project folder with cmd

Step 2: Run compose command to build image and run 3 projects:
``` cmd
docker compose up --build --no-deps -d springgrpc envoy angularioexample
```

- springgrpc: Springboot backend connect to MongoDB
- envoy: Proxy server to handle HTTP2 request for client, found more at [Envoy official site][Envoy]
- angularioexample: Angular project use grpc-web for demo perposes

Step 3: Open localhost:4200 in your favorite browser.

[Envoy]: https://www.envoyproxy.io
[gRPC]: https://grpc.io
[grpc-web-docs]: https://grpc.io/docs/languages/web