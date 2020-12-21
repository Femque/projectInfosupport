
export class User {

  public user_id: number;
  public firstname: string;
  public lastname: string;
  public email: string;
  public phonenumber: string;
  public password: string;
  public dateOfBirth: Date;
  public gender: string;


  constructor(user_id?: number, firstname?: string, lastname?: string, email?: string, phonenumber?: string, password?:
    string, dateOfBirth?: Date, gender?: string) {
    this.user_id = user_id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phonenumber = phonenumber;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
  }
}
