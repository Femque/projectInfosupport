package app.service;


import app.models.Appointment;
import app.repositories.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

  private final AppointmentRepository repository;


  public List<Appointment> getAppointments()
  {
    return repository.findAll();
  }

  public void updateAppointment(LocalDateTime start_time, LocalDateTime end_time, boolean is_digital,
                                String description, String location, boolean is_follow_up, int appointment_code){
    repository.saveAppointmentBy(start_time, end_time, is_digital, description,
      location, is_follow_up, appointment_code);
  }

  public void createAppointment(Appointment appointment) {
    repository.save(appointment);
  }

  public void deleteAppointment(int id) {
    repository.deleteById(id);
  }

  public List<String> getPatientsForGp(int gp_user_id){
    return repository.getPatients(gp_user_id);
  }

}
