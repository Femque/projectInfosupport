package nl.hva.service;

import nl.hva.models.Patient;
import nl.hva.repositories.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

  public void updatePatient(int user_id, String email, String firstname, String lastname,
                            String password, String phoneNumber, LocalDate dateOfBirth){
    repo.savePatientBy(email, firstname, lastname, password,
      phoneNumber, dateOfBirth, user_id);
  }

  public List<Patient> getPatientsForGp(int gp_user_id) {
    return repo.getPatients(gp_user_id);
  }

  public Integer getGPByPatientUserId(int user_id) {
    return repo.getGPByPatientUserId(user_id);
  }

  public void updatePatientGP(int gpUserId, int userId) {
    repo.updatePatientGP(gpUserId, userId);
  }
}
