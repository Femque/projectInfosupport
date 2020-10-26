export class Patient {

  public user_id: number;
  public dateOfBirth: Date;
  public gender: String;
  public allergies: String;


  constructor(user_id?: number, dateOfBirth?: Date, gender?: String, allergies?: String) {
    this.user_id = user_id;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.allergies = allergies;
  }
}
