import {User} from "./user";

export class GP extends User{

  public big_code: String;
  public specialty: String;

  constructor(user_id?: number, firstname?: String, lastname?: String, email?: String, phonenumber?: String, password?: String, big_code?: String, specialty?: String) {
    super(user_id, firstname, lastname, email, phonenumber, password);
    this.big_code = big_code;
    this.specialty = specialty;
  }
}
