package dev.vietnq.service;

import dev.vietnq.dto.DoctorDocument;
import dev.vietnq.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public DoctorDocument create(DoctorDocument doctorDocument) {
        return doctorRepository.insert(doctorDocument);
    }

    @Override
    public List<DoctorDocument> readAll() {
        return doctorRepository.findAll();
    }

    @Override
    public DoctorDocument update(DoctorDocument doctorDocument) {
        return doctorRepository.save(doctorDocument);
    }

    @Override
    public Map<String, String> delete(String id) {
        // Total count of data before delete
        long beforeDelete = doctorRepository.count();

        doctorRepository.deleteById(id);

        // Total count of data after delete
        long afterDelete = doctorRepository.count();

        String messageValue = beforeDelete == afterDelete ? "Delete failed!" : "Record deleted";

        Map<String, String> deleteMap = new HashMap<>();
        deleteMap.put("message", messageValue);

        return deleteMap;
    }
}
