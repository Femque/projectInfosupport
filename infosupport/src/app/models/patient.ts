import {User} from "./user";

export class Patient extends User{

  public user_id: number;
  public dateOfBirth: Date;
  public gender: String;
  public allergies: String;

  constructor() {
    super();
  }
}
