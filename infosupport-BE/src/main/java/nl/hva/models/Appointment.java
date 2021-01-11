package nl.hva.models;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Appointment")
public class Appointment {

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Integer appointment_code;

  private LocalDateTime start_time;
  private LocalDateTime end_time;

  private Boolean is_digital;
  private String description;
  private String location;
  private Boolean is_follow_up;
  private Integer big_code;
  private String title;
  private Integer patient_user_id;



  public LocalDateTime getStart_time() {
    return start_time;
  }
  public LocalDateTime getEnd_time() {
    return end_time;
  }

  public boolean isIs_digital() {
    return is_digital;
  }

  public String getDescription() {
    return description;
  }

  public String getLocation() {
    return location;
  }

  public Boolean getIs_follow_up() {
    return is_follow_up;
  }

  public Integer getBig_code() {
    return big_code;
  }

  public Integer getPatient_user_id() {
    return patient_user_id;
  }

  public String getTitle() {
    return title;
  }

  public Integer getAppointment_code() {
    return appointment_code;
  }


}
