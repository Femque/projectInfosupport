package app.models;


import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
//  private static LocalDateTime startDate;
  private static LocalDateTime endDate;
  private LocalDateTime date = LocalDateTime.now();
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

  public void setDescription(String description) {
    this.description = description;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public void setStartDate(LocalDateTime date) {
   this.date = date;
  }

  public void setEndDate(LocalDateTime endDate) {
    Appointment.endDate = endDate;
  }

  public LocalDateTime getStartDate() {
    return date;
  }

  public LocalDateTime getEndDate() {
    return endDate;
  }

  //  public boolean isFollowUp() {
//    return isFollowUp;
//  }


  public Appointment(long id, String patient, String gp, LocalDateTime startDate, LocalDateTime endDate, String description, String location) {
    this.id = id;
    this.patient = patient;
    this.gp = gp;
    this.date = startDate;
    Appointment.endDate = endDate;
    this.description = description;
    this.location = location;
  }


  public static Appointment createAppointmentForTesting(int idCounter) {

    Appointment appointment = new Appointment(0, null, null, LocalDateTime.now(), LocalDateTime.now(), null, null);
    appointment.setId(appointment.id + idCounter);
    appointment.setPatient("Test Patient " + idCounter);
    appointment.setGp("Test GP " + idCounter);
    appointment.setStartDate(appointment.date);
    appointment.setEndDate(endDate);
    appointment.setLocation("Zonneveldt");


    return appointment;
  }
}
