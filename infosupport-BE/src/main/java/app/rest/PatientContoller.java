package app.rest;

import app.models.Appointment;
import app.models.Patient;
import app.models.User;
import app.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("patient")
public class PatientContoller {

  private final PatientService service;

  @GetMapping
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Patient>> index() {
    List<Patient> patients = service.findAll();

    return ResponseEntity.ok(patients);
  }

  @GetMapping(value = "/id")
  @CrossOrigin
  public ResponseEntity<Integer> getId(@RequestParam int id) {
    List<Patient> patients = service.findAll();
    for(Patient patient : patients) {
      if (patient.getUser_id().equals(id)) {
        return ResponseEntity.ok(patient.getUser_id());
      } else {
        System.out.println("");
      }
    }
    return null;
  }

  //getting the data of patient by id
  @CrossOrigin
  @GetMapping("/{id}")
  public ResponseEntity<List<Patient>> getAllPatientDataById(@PathVariable int id) {
    List<Patient> patientData = service.getPatient(id);
    return ResponseEntity.ok(patientData);
  }


}
