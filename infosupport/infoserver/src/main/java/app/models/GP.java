package app.models;

public class GP extends User{

  private String specialty;

  public GP(long id, String firstname, String surname, String email, String password, int phonenumber, String specialty) {
    super(id, firstname, surname, email, password, phonenumber);
    this.specialty = specialty;
  }
}
