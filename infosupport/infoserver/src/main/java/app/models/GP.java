package app.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "General_practitioner")
public class GP {

  @Id
  @Column(name = "big_code")
  private String big_code;

  @Column(name = "specialty")
  private String specialty;

  @Column(name = "user_id")
  private Integer user_id;

  public GP() {

  }

  public String getBig_code() {
    return big_code;
  }

  public void setBig_code(String big_code) {
    this.big_code = big_code;
  }

  public String getSpecialty() {
    return specialty;
  }

  public void setSpecialty(String specialty) {
    this.specialty = specialty;
  }

  public void setUser_id(Integer user_id) {
    this.user_id = user_id;
  }
}
