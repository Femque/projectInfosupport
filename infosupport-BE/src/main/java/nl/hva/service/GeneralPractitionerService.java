package nl.hva.service;

import nl.hva.models.General_practitioner;
import nl.hva.repositories.GeneralPractitionerRepository;
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

  public General_practitioner findGp(int user_id){
    return repo.getGeneral_practitionerByuser_id(user_id);
  }
}
