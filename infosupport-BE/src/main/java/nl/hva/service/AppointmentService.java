package nl.hva.service;


import nl.hva.models.Appointment;
import nl.hva.repositories.AppointmentRepository;
import lombok.RequiredArgsConstructor;
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


  public List<Appointment> getAppointmentsById(int patient_user_id){
    return repository.getAppointmentsByPatient_user_id(patient_user_id);
  }

  public void updateAppointment(LocalDateTime start_time, LocalDateTime end_time, boolean is_digital,
                                String description, String location, boolean is_follow_up, String title, int appointment_code){
    repository.saveAppointmentBy(start_time, end_time, is_digital, description,
      location, is_follow_up, title, appointment_code);
  }

  public void createAppointment(Appointment appointment) {
    repository.save(appointment);
  }

  public Appointment getByAppointmentCode(int appointmentCode) {
    return repository.getByAppointmentCode(appointmentCode);
  }

  public void deleteAppointment(int id) {
    repository.deleteById(id);
  }


  public List<String> getPatientsForGp(int gp_user_id){
    return repository.getPatients(gp_user_id);
  }

  public List<Appointment> getAppointmentsForGp(int bigCode){
    return repository.getAppointmentsByBigCode(bigCode);
  }

  public int getBigCode(int userId){
    return repository.getBigCode(userId);
  }

  public int getGPUserId(int userId){
    return repository.getGPUserId(userId);
  }
}
