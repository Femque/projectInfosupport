package app.models;

import org.apache.tomcat.jni.Local;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;

public class Appointment {

  public long id;

  //later aanpassen naar Patient patient
  public String patient;

  //later aanpassen naar Gp gp
  private String gp;
  private String location;
  private LocalDateTime startTime;
  private LocalDateTime endTime;
  private boolean isFollowUp;

  public long getId() {
    return id;
  }

  public String getPatient() {
    return patient;
  }

  public String getGp() {
    return gp;
  }

  public String getLocation() {
    return location;
  }

  public LocalDateTime getStartTime() {
    return startTime;
  }

  public LocalDateTime getEndTime() {
    return endTime;
  }

  public boolean isFollowUp() {
    return isFollowUp;
  }

  public Appointment(long id, String patient, String gp, String location, LocalDateTime startTime, LocalDateTime endTime, boolean isFollowUp) {
    this.id = id;
    this.patient = patient;
    this.gp = gp;
    this.location = location;
    this.startTime = startTime;
    this.endTime = endTime;
    this.isFollowUp = isFollowUp;
  }

  public static Appointment createAppointmentForTesting(int idCounter) {
    Appointment appointment = new Appointment(0, null, null, null, null, null, false);

    appointment.id += appointment.id + idCounter;
    appointment.patient = "Test patient " + idCounter;
    appointment.gp = "Test GP " + idCounter;
    appointment.location = "Test location " + idCounter;
    appointment.startTime = LocalDateTime.now();
    appointment.endTime = LocalDateTime.now();
    appointment.isFollowUp = false;

    return appointment;
  }
}
