package app.models;

public class User {

  public long id;

  private String firstname;
  private String surname;
  private String email;
  private String password;
  private int phonenumber;

  //Gp, assistent or patient
  public String role;

  public User(long id, String firstname, String surname, String email, String password, int phonenumber) {
    this.id = id;
    this.firstname = firstname;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.phonenumber = phonenumber;
  }
}
