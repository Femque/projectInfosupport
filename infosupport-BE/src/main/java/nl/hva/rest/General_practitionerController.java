package nl.hva.rest;

import nl.hva.models.General_practitioner;
import nl.hva.models.Patient;
import nl.hva.service.GeneralPractitionerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("doctor")
public class General_practitionerController {

  private final GeneralPractitionerService service;

  @GetMapping
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<General_practitioner>> index() {
    List<General_practitioner> doctors = service.findAll();

    return ResponseEntity.ok(doctors);
  }

  @GetMapping("/big_code/{user_id}")
  @CrossOrigin
  public ResponseEntity<Integer> findBigCodeByUserId(@PathVariable int user_id) {
    service.findBigCodeByUserId(user_id);
    return ResponseEntity.ok(service.findBigCodeByUserId(user_id));
  }

  @GetMapping("/user_id/{user_id}")
  @CrossOrigin
  public ResponseEntity<General_practitioner> findByUserid(@PathVariable int user_id){
    return ResponseEntity.ok(service.findGp(user_id));
  }
}
