package app.rest;


import app.models.Appointment;
import app.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InfosupportController {
  AppointmentRepository repo;

  @Autowired
  public InfosupportController(AppointmentRepository repo) {this.repo = repo;}

  @CrossOrigin
  @GetMapping("/appointments")
  public List<Appointment> getAllAppointments() { return repo.findAll(); }

  @CrossOrigin
  @PostMapping("/appointments/create")
  public Appointment createAppointment(@RequestBody Appointment appointment) { return repo.createAppointment(appointment); }
}
