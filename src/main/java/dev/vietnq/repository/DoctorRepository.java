package dev.vietnq.repository;

import dev.vietnq.dto.DoctorDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends MongoRepository<DoctorDocument, String> {
}
