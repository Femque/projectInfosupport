package app.models;


import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Appointment")
@NamedQueries({
  @NamedQuery(name = "find_all", query = "SELECT a FROM Appointment a")
})
public class Appointment {

  @Id
  @Column(name = "appointment_code")
  private Integer appointment_code;

  @Column(name = "patient")
  private Patient patient;

  @Column(name = "gp")
  private GP gp;

  @Column(name = "date")
  private LocalDateTime date = LocalDateTime.now();

  @Column(name = "start_time")
  private LocalDateTime start_time;

  @Column(name = "end_time")
  private LocalDateTime end_time;

  @Column(name = "is_digital")
  private boolean is_digital;

  @Column(name = "description")
  private String description;

  @Column(name = "location")
  private String location;

  @Column(name = "is_follow_up")
  private Boolean is_follow_up;

  @Column(name = "big_code")
  private Integer big_code;

  @Column(name = "patient_user_id")
  private Integer patient_user_id;

  public Appointment() {
  }

  public Integer getAppointment_code() {
    return appointment_code;
  }

  //  public static Appointment createAppointmentForTesting(int idCounter) {
//
//    Appointment appointment = new Appointment(0, null, null, LocalDateTime.now(), LocalDateTime.now(), null, null);
//    appointment.setId(appointment.id + idCounter);
//    appointment.setPatient("Test Patient " + idCounter);
//    appointment.setGp("Test GP " + idCounter);
//    appointment.setStartDate(appointment.date);
//    appointment.setEndDate(endDate);
//    appointment.setLocation("Zonneveldt");
//
//
//    return  appointment;
//  }
}
