FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY target/spring-mongodb-service-1.0-SNAPSHOT.jar spring-mongodb-service-1.0-SNAPSHOT.jar
EXPOSE 8080 9090
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/spring-mongodb-service-1.0-SNAPSHOT.jar"]