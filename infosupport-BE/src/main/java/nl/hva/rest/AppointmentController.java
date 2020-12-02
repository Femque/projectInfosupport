package nl.hva.rest;


import nl.hva.models.Appointment;
import nl.hva.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequiredArgsConstructor
//@RequestMapping("/appointments")
public class AppointmentController {

  private final AppointmentService appointmentService;


  @GetMapping("/appointments")
  @CrossOrigin
  public ResponseEntity<List<Appointment>> getAllAppointments() {
    List<Appointment> appointments = appointmentService.getAppointments();
    System.out.println(appointments.get(0).getStart_time());
    return ResponseEntity.ok(appointments);
  }


  @GetMapping("/appointments/gp/{big_code}")
  @CrossOrigin
  public ResponseEntity<List<Appointment>> getAppointmentsByBig( @PathVariable int big_code) {
    List<Appointment> appointments = appointmentService.getAppointmentsForGp(big_code);
    return ResponseEntity.ok(appointments);
  }

  @CrossOrigin
  @GetMapping("/appointments/{id}")
  public ResponseEntity<List<Appointment>> getAllAppointmentsById(@PathVariable int id) {
    List<Appointment> appointments = appointmentService.getAppointmentsById(id);
    return ResponseEntity.ok(appointments);
  }

//  @CrossOrigin
//  @PostMapping("/appointments/create")
//  public Appointment createAppointment(@RequestBody Appointment appointment) { return repo.createAppointment(appointment); }

//  @PostMapping
//  public ResponseEntity<Appointment> create(@RequestBody Appointment appointment) {
//    appointmentService.createAppointment(appointment);
//    return ResponseEntity.ok(appointment);
//  }


  @PostMapping("/appointments/create")
  @CrossOrigin
  @Transactional
  public ResponseEntity<Appointment> store(@RequestBody Appointment appointment) {
    System.out.println(appointment);
    appointmentService.createAppointment(appointment);
    return ResponseEntity.ok(appointment);
  }


  @PutMapping("/appointments/update")
  @CrossOrigin
  @Transactional
  public ResponseEntity<Appointment> update(@RequestBody Appointment appointment) {
    System.out.println(appointment.getTitle());
    appointmentService.updateAppointment(appointment.getStart_time(), appointment.getEnd_time(),
      appointment.isIs_digital(), appointment.getDescription(), appointment.getLocation(), appointment.getIs_follow_up(), appointment.getTitle(), appointment.getAppointment_code());
    System.out.println(appointment.getStart_time());
    return ResponseEntity.ok(appointment);
  }

  @CrossOrigin
  @DeleteMapping("/appointments/delete/{id}")
  public ResponseEntity<Integer> delete(@PathVariable int id) {
    appointmentService.deleteAppointment(id);
    return ResponseEntity.ok(id);
  }

  @CrossOrigin
  @GetMapping("/appointments/getPatients/{gp_user_id}")
  public ResponseEntity<List<String>> getPatients(@PathVariable int gp_user_id){
    appointmentService.getPatientsForGp(gp_user_id);
    return ResponseEntity.ok(appointmentService.getPatientsForGp(gp_user_id));
  }

  @CrossOrigin
  @GetMapping("/appointments/big_code/{user_id}")
  public ResponseEntity<Integer> getBigCode(@PathVariable int user_id){
    int big = appointmentService.getBigCode(user_id);
    return ResponseEntity.ok(big);
  }

  @CrossOrigin
  @GetMapping("/appointments/patient/gp/{user_id}")
  public ResponseEntity<Integer> getGPUserId(@PathVariable int user_id){
    int gpUserId = appointmentService.getGPUserId(user_id);
    return ResponseEntity.ok(gpUserId);
  }
}
