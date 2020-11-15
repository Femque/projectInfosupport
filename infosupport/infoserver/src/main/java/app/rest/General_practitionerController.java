package app.rest;

import app.models.General_practitioner;
import app.service.GeneralPractitionerService;
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
}
