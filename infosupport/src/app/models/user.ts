
export class User {

  public user_id: number;
  public firstname: String;
  public lastname: String;
  public email: String;
  public phonenumber: String;
  public password: String;


  constructor(user_id?: number, firstname?: String, lastname?: String, email?: String, phonenumber?: String, password?: String) {
    this.user_id = user_id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phonenumber = phonenumber;
    this.password = password;
  }
}
