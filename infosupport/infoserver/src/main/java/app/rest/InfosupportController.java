package app.rest;


import app.models.Appointment;
import app.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InfosupportController {
  AppointmentRepository repo;

  @Autowired
  public InfosupportController(AppointmentRepository repo) {this.repo = repo;}

  @GetMapping("/test")
  public List<Appointment> getAllAppointments() { return repo.findAll(); }

  @PostMapping("/posttest")
  public Appointment createAppointment(@RequestBody Appointment appointment) { return repo.createAppointment(appointment); }
}
