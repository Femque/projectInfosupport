import {User} from "./user";

export class Patient extends User{

  public user_id: number;
  public dateOfBirth: Date;
  public gender: String;
  public allergies: String;


  constructor(user_id?: number, firstname?: String, lastname?: String, email?: String, phonenumber?: String, password?: String, dateOfBirth?: Date, gender?: String, allergies?: String) {
    super(user_id, firstname, lastname, email, phonenumber, password);
    this.user_id = user_id;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.allergies = allergies;
  }
}
