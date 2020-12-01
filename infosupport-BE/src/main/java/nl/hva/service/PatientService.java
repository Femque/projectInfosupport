package nl.hva.service;

import nl.hva.models.Patient;
import nl.hva.repositories.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

  private final PatientRepository repo;

  public List<Patient> findAll() {
    return repo.findAll();
  }

  //find specific user with ID
  public List<Patient> getPatient(int patient_user_id){
    return repo.getPatientByUser_id(patient_user_id);
  }

  public List<Patient> getPatientsForGp(int gp_user_id){
    return repo.getPatients(gp_user_id);
  }
}
