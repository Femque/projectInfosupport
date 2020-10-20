package app.models;

public class GP extends User{

  private String bigCode;
  private String specialty;

  public GP(long id, String firstname, String lastname, String email, int phonenumber, String password, String bigCode, String specialty) {
    super(id, firstname, lastname, email, phonenumber, password);
    this.bigCode = bigCode;
    this.specialty = specialty;
  }
}
