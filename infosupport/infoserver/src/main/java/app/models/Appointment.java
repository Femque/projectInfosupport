package app.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Appointment")
public class Appointment {

  @Id
  @Column(name = "appointment_code")
  private Integer appointment_code;


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

  public void setAppointment_code(Integer appointment_code) {
    this.appointment_code = appointment_code;
  }


  public void setStart_time(LocalDateTime start_time) {
    this.start_time = start_time;
  }

  public void setEnd_time(LocalDateTime end_time) {
    this.end_time = end_time;
  }

  public void setIs_digital(boolean is_digital) {
    this.is_digital = is_digital;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public void setIs_follow_up(Boolean is_follow_up) {
    this.is_follow_up = is_follow_up;
  }

  public void setBig_code(Integer big_code) {
    this.big_code = big_code;
  }

  public void setPatient_user_id(Integer patient_user_id) {
    this.patient_user_id = patient_user_id;
  }

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

  public Integer getAppointment_code() {
    return appointment_code;
  }
}
