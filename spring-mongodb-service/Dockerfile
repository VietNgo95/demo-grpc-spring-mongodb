FROM openjdk:8-jdk-alpine
COPY ./target/spring-mongodb-service-1.0-SNAPSHOT.jar spring-mongodb-service-1.0-SNAPSHOT.jar
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/spring-mongodb-service-1.0-SNAPSHOT.jar"]