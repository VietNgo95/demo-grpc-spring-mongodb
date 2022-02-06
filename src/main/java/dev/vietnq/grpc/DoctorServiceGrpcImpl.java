package dev.vietnq.grpc;

import com.google.protobuf.Empty;
import dev.vietnq.dto.DoctorDocument;
import dev.vietnq.service.DoctorService;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@GrpcService
public class DoctorServiceGrpcImpl extends DoctorServiceGrpc.DoctorServiceImplBase {
    private static final Logger logger = Logger.getLogger(DoctorServiceGrpcImpl.class.getName());
    @Autowired
    private Environment env;
    @Autowired
    private DoctorService doctorService;

    @Override
    public void getAllDoctor(Empty request, StreamObserver<Doctor> responseObserver) {
        streamAllDoctor(responseObserver);
    }

    @Override
    public void createDoctor(Doctor request, StreamObserver<Doctor> responseObserver) {
        DoctorDocument doctorDocument = DoctorDocument.newBuilder(request).build();
        DoctorDocument newDoctor = doctorService.create(doctorDocument);
        logger.log(Level.INFO, "Created doctor : {0}", newDoctor.toString());
        streamAllDoctor(responseObserver);
    }

    /**
     * Use the response observer to return every doctor from service
     * @param responseObserver
     */
    private void streamAllDoctor(StreamObserver<Doctor> responseObserver) {
        List<DoctorDocument> doctors = doctorService.readAll();
        for (DoctorDocument doctor : doctors) {
            logger.log(Level.INFO, "debug doctor : {0}", doctor.toString());
            responseObserver.onNext(Doctor.newBuilder()
                    .setId(doctor.getId())
                    .setName(doctor.getName())
                    .setAge(doctor.getAge())
                    .build());
        }
        responseObserver.onCompleted();
    }
}
