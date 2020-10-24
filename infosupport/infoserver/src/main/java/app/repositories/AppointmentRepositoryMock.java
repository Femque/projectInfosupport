package app.repositories;

import app.models.Appointment;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class AppointmentRepositoryMock implements AppointmentRepository {

  public List<Appointment> appointments = new ArrayList<>();
  public Appointment appointment;
  public int idCounter = 1;

  public AppointmentRepositoryMock() {
    findAll();
  }


  @Override
  public List<Appointment> findAll() {
    return appointments;
  }

  @Override
  public Appointment findById(long appointment_code) {
    for (Appointment value : appointments) {
      if (value.getAppointment_code() == appointment_code) {
        return value;
      }
    }

    return null;
  }

  @Override
  public Appointment createAppointment(Appointment appointment) {

    System.out.println("creating appointment");
    appointments.add(appointment);

    return appointment;
  }

  @Override
  public Appointment deleteAppointment(long id) {
    for (int i = 0; i < appointments.size(); i++) {
      if (appointments.get(i).getAppointment_code() == id) {
        appointments.remove(i);
        return appointments.get(i);
      }
    }

    return null;
  }


}
