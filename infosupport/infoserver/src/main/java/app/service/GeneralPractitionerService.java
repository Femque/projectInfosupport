package app.service;

import app.models.General_practitioner;
import app.repositories.GeneralPractitionerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeneralPractitionerService {

  private final GeneralPractitionerRepository repo;

  public List<General_practitioner> findAll() {
    return repo.findAll();
  }

  public Integer findBigCodeByUserId(Integer user_id) { return repo.findBigCodeByUserId(user_id); }
}
