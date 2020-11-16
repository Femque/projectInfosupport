package app.repositories;

import app.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import javax.annotation.security.PermitAll;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {


  @Modifying
  @Query("Update Appointment a Set a.start_time = ?1, a.end_time = ?2,  a.is_digital = ?3, a.description = ?4 , a.location = ?5, a.is_follow_up = ?6, a.title = ?7 where a.appointment_code = ?8")
  void saveAppointmentBy(@Param("start_time") LocalDateTime start_time,
                         @Param("end_time") LocalDateTime end_time,
                         @Param("is_digital") boolean is_digital,
                         @Param("description") String description,
                         @Param("location") String location,
                         @Param("is_follow_up") boolean is_follow_up,
                         @Param("title") String title,
                         @Param("appointment_code") int appointment_code
                         );

  @Modifying
  @Query("SELECT p.firstname, p.lastname FROM Patient p WHERE p.gp_user_id = ?1")
  List<String> getPatients(@Param("gp_user_id") int gp_user_id);


  @Modifying
  @Query(value = "SELECT * FROM Appointment a WHERE a.big_code = ?1", nativeQuery = true)
  List<Appointment> getAppointmentsByBigCode(@Param("big_code") int bigCode);



//  @Query("SELECT a FROM Appointment a WHERE a.patient_user_id = ?1")
  @Query(
    value = "SELECT * FROM Appointment a WHERE a.patient_user_id = ?1",
    nativeQuery = true)
  List<Appointment> getAppointmentsByPatient_user_id(@Param("patient_user_id") int patient_user_id);


  @Query("SELECT g.big_code FROM General_practitioner g WHERE g.user_id = ?1")
  int getBigCode(@Param("user_id") int user_id);


}
