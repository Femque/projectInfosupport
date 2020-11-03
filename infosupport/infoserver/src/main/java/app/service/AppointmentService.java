package app.service;


import app.models.Appointment;
import app.repositories.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

  private final AppointmentRepository repository;


  public List<Appointment> getAppointments(){
    return repository.findAll();
  }
}
