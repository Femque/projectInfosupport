package app.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
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

  public Appointment(Integer appointment_code, Patient patient, GP gp, LocalDateTime date, LocalDateTime start_time,
                     LocalDateTime end_time, boolean is_digital, String description, String location,
                     Boolean is_follow_up, Integer big_code, Integer patient_user_id) {
    this.appointment_code = appointment_code;
    this.patient = patient;
    this.gp = gp;
    this.date = date;
    this.start_time = start_time;
    this.end_time = end_time;
    this.is_digital = is_digital;
    this.description = description;
    this.location = location;
    this.is_follow_up = is_follow_up;
    this.big_code = big_code;
    this.patient_user_id = patient_user_id;
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
