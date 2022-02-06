package dev.vietnq.service;

import dev.vietnq.dto.DoctorDocument;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface DoctorService {

    DoctorDocument create(DoctorDocument doctorDocument);

    List<DoctorDocument> readAll();

    DoctorDocument update(DoctorDocument doctorDocument);

    Map<String, String> delete(String id);

}
