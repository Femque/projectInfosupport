package app.rest;


import app.models.Appointment;
import app.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/appointments")
public class AppointmentController {

  private final AppointmentService appointmentService;

  @GetMapping
  @CrossOrigin
  public ResponseEntity<List<Appointment>> getAllAppointments() {
    List<Appointment> appointments = appointmentService.getAppointments();
    return ResponseEntity.ok(appointments);
  }

  @PostMapping("/create")
  @CrossOrigin
  public ResponseEntity<Appointment> store(@RequestBody Appointment appointment) {
    System.out.println(appointment);
    appointmentService.createAppointment(appointment);
    return ResponseEntity.ok(appointment);
  }
}
