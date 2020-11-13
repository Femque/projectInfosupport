package app.rest;

import app.models.GeneralPractitioner;
import app.service.GeneralPractitionerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("doctor")
public class General_practitionerController {

  private final GeneralPractitionerService service;

  @GetMapping
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<GeneralPractitioner>> index() {
    List<GeneralPractitioner> doctors = service.findAll();

    return ResponseEntity.ok(doctors);
  }
}
