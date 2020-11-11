package app.service;

import app.models.GeneralPractitioner;
import app.repositories.GeneralPractitionerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeneralPractitionerService {

  private final GeneralPractitionerRepository repo;

  public List<GeneralPractitioner> findAll() {
    return repo.findAll();
  }
}
