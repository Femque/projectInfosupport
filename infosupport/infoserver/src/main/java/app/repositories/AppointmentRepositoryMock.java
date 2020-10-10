package app.repositories;

import app.models.Appointment;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AppointmentRepositoryMock implements AppointmentRepository {

  public ArrayList<Appointment> appointments = new ArrayList<>();
  public Appointment appointment;
  public int idCounter = 1;

  public AppointmentRepositoryMock() {

    for (int i = 0; i < 5; i++) {
      appointments.add(Appointment.createAppointmentForTesting(this.idCounter));
      ++idCounter;
    }

  }

  @Override
  public List<Appointment> findAll() {
    return appointments;
  }

  @Override
  public Appointment findById(long id) {
    return null;
  }
}
