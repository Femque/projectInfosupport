package app.models;

import org.apache.tomcat.jni.Local;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Calendar;

public class Appointment {

  public long id;

  //later aanpassen naar Patient patient
  public String patient;
  //later aanpassen naar Gp gp
  private String gp;

  private Date date;
  private LocalTime startTime;
  private LocalTime endTime;
  private String description;
  private String location;

//  private boolean isFollowUp;

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

  public LocalTime getStartTime() {
    return startTime;
  }

  public LocalTime getEndTime() {
    return endTime;
  }

  public String getDescription() {
    return description;
  }

  //  public boolean isFollowUp() {
//    return isFollowUp;
//  }


  public Appointment(long id, String patient, String gp, Date date, LocalTime startTime, LocalTime endTime, String description, String location) {
    this.id = id;
    this.patient = patient;
    this.gp = gp;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.description = description;
    this.location = location;
  }

  public static Appointment createAppointmentForTesting(int idCounter) {
    Appointment appointment = new Appointment(0, null, null, null, null, null, null, null);

    appointment.id += appointment.id + idCounter;
    appointment.patient = "Test patient " + idCounter;
    appointment.description = "";
//    appointment.gp = "Test GP " + idCounter;
    appointment.location = "Test location " + idCounter;
    appointment.startTime = LocalTime.now();
    appointment.endTime = LocalTime.now();
//    appointment.isFollowUp = false;

    return appointment;
  }
}
