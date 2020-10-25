package app.repositories;

import app.models.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class AppointmentRepositoryMock implements AppointmentRepository  {

  @PersistenceContext
  private EntityManager em;

  public List<Appointment> appointments = new ArrayList<>();
  public Appointment appointment;
  public int idCounter = 1;

  public AppointmentRepositoryMock() {
    findAll();
  }

  @Transactional
  @Override
  public List<Appointment> findAll() {
    TypedQuery<Appointment> query = em.createNamedQuery("find_all", Appointment.class);
    return query.getResultList();
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
