package app.models;

import java.time.LocalDate;

public class Patient extends User {

  private LocalDate dateOfBirth;
  private String gender;

  public Patient(long id, String firstname, String surname, String email, String password, int phonenumber, LocalDate dateOfBirth, String gender) {
    super(id, firstname, surname, email, password, phonenumber);
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
  }
}
