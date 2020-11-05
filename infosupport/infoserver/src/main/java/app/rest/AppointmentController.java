package app.rest;


import app.models.Appointment;
import app.service.AppointmentService;
import org.hibernate.service.spi.InjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AppointmentController {

  private final AppointmentService appointmentService;

  @GetMapping("/appointments")
  @CrossOrigin
  public ResponseEntity<List<Appointment>> getAllAppointments() {
    List<Appointment> appointments = appointmentService.getAppointments();
    return ResponseEntity.ok(appointments);
  }

  @PostMapping("/create")
  @CrossOrigin
  public ResponseEntity<Appointment> store(@RequestBody Appointment appointment) {
    appointmentService.createAppointment(appointment);
    return ResponseEntity.ok(appointment);
  }


  @PutMapping("/appointments/update")
  @CrossOrigin
  @Transactional
  public ResponseEntity<Appointment> update(@RequestBody Appointment appointment) {
    appointmentService.updateAppointment(appointment.getStart_time(), appointment.getEnd_time(),
      appointment.isIs_digital(), appointment.getDescription(), appointment.getLocation(), appointment.getIs_follow_up(), appointment.getAppointment_code());
    return ResponseEntity.ok(appointment);
  }

  @PostMapping("/appointments/delete")
  @CrossOrigin
  public ResponseEntity<Appointment> delete(@RequestBody Appointment appointment) {
    appointmentService.deleteAppointment(appointment);
    return ResponseEntity.ok(appointment);
  }
}
