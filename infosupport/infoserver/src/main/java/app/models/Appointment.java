package app.models;


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
  private String patient;
  //later aanpassen naar Gp gp
  private String gp;

  private LocalDate date;
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

  public void setId(long id) {
    this.id = id;
  }

  public void setPatient(String patient) {
    this.patient = patient;
  }

  public void setGp(String gp) {
    this.gp = gp;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public void setStartTime(LocalTime startTime) {
    this.startTime = startTime;
  }

  public void setEndTime(LocalTime endTime) {
    this.endTime = endTime;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  //  public boolean isFollowUp() {
//    return isFollowUp;
//  }


  public Appointment(long id, String patient, String gp, LocalDate date, LocalTime startTime, LocalTime endTime, String description, String location) {
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

    appointment.setId(appointment.id + idCounter);
    appointment.setPatient("Test Patient" + idCounter);
    appointment.setGp("Test GP" + idCounter);
    appointment.setDate(LocalDate.now());
    appointment.setStartTime(LocalTime.now());
    appointment.setEndTime(LocalTime.now());
    appointment.setDescription("");
    appointment.setLocation("Zonneveldt");

    return appointment;
  }
}
