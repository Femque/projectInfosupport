import {User} from "./user";

export class Patient {

  private user_id: number;
  private dateOfBirth: Date;
  private gender: string;
  private allergies: string;
  private email: string;
  private firstname: string;
  private lastname: string;
  private phonenumber: string;
  private password: string;


  constructor(user_id?: number, dateOfBirth?: Date, gender?: string, allergies?: string, email?: string, firstname?: string, lastname?: string, phonenumber?: string, password?: string) {
    this.user_id = user_id;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.allergies = allergies;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phonenumber = phonenumber;
    this.password = password;
  }

 
}
