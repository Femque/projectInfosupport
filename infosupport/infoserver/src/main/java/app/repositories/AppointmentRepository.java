package app.repositories;

import app.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
  public List<Appointment> findAll();

//  @Query("SELECT ... FROM Appointment a")
//  public List<Appointment> findSpecific();
  //=?1 =?2 =?3
  //test(String email, int id);

//  SELECT u.firstname, u.lastname, a.location,
//  a.description, a.start_time, a.end_time
//  FROM Appointment a
//  INNER JOIN User u
//  ON a.patient_user_id = u.user_id
//  INNER JOIN General_practitioner g
//  ON a.big_code = g.big_code
//  WHERE a.big_code = 456
}
