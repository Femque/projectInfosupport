package app.service;

import app.models.Patient;
import app.repositories.PatientRepository;
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
}
