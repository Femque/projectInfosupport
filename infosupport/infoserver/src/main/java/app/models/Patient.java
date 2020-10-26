package app.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity(name = "Patient")
public class Patient extends User {

  @Id
  @Column(name = "user_id")
  private Integer user_id;

  @Column(name = "dateOfBirth")
  private LocalDate dateOfBirth;

  @Column(name = "gender")
  private String gender;

  @Column(name = "allergies")
  private String allergies;

  public Patient(){

  }

  @Override
  public Integer getUser_id() {
    return user_id;
  }

  @Override
  public void setUser_id(Integer user_id) {
    this.user_id = user_id;
  }

  public LocalDate getDateOfBirth() {
    return dateOfBirth;
  }

  public void setDateOfBirth(LocalDate dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public String getAllergies() {
    return allergies;
  }

  public void setAllergies(String allergies) {
    this.allergies = allergies;
  }
}
