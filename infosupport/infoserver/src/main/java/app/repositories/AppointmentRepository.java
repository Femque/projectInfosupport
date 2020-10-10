package app.repositories;

import app.models.Appointment;
import org.springframework.stereotype.Component;

import java.util.List;

public interface AppointmentRepository {
  public List<Appointment> findAll();
  public Appointment findById(long id);
}
