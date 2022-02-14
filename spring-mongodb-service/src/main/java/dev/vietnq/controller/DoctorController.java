package dev.vietnq.controller;

import dev.vietnq.dto.DoctorDocument;
import dev.vietnq.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("rest/doctors")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public DoctorDocument createDoctor(@RequestBody DoctorDocument doctorDocument) {
        return doctorService.create(doctorDocument);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<DoctorDocument> getAllDoctor() {
        return doctorService.readAll();
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public DoctorDocument updateDoctor(@RequestBody DoctorDocument doctorDocument) {
        return doctorService.update(doctorDocument);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> deleteDoctor(@PathVariable String id) {
        return doctorService.delete(id);
    }
}
