package app.models;

import java.time.LocalDate;

public class Patient extends User {

  private LocalDate dateOfBirth;
  private String gender;

  public Patient(long id, String firstname, String lastname, String email, int phonenumber, String password, LocalDate dateOfBirth, String gender) {
    super(id, firstname, lastname, email, phonenumber, password);
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
  }
}
