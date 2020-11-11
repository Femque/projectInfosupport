package app.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "General_practitioner")
public class GeneralPractitioner implements Serializable {

  @Id
  @Column(name = "big_code")
  private int big_code;

  @Column(name = "specialty")
  private String specialty;

  public GeneralPractitioner() { }

  public int getBig_code() {
    return big_code;
  }

  public void setBig_code(int big_code) {
    this.big_code = big_code;
  }

  public String getSpecialty() {
    return specialty;
  }

  public void setSpecialty(String specialty) {
    this.specialty = specialty;
  }

}
