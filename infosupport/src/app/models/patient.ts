import {User} from "./user";

export class Patient {

  private _user_id: number;
  private _dateOfBirth: Date;
  private _gender: string;
  private _allergies: string;

  constructor() {
  }


  get user_id(): number {
    return this._user_id;
  }

  set user_id(value: number) {
    this._user_id = value;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  set dateOfBirth(value: Date) {
    this._dateOfBirth = value;
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get allergies(): string {
    return this._allergies;
  }

  set allergies(value: string) {
    this._allergies = value;
  }
}
