package app.models;

public class User {

  public long id;

  private String firstname;
  private String lastname;
  private String email;
  private int phonenumber;
  private String password;
  //Gp, assistent or patient

  public User(long id, String firstname, String lastname, String email, int phonenumber, String password) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phonenumber = phonenumber;
    this.password = password;
  }
}
