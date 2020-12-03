import {User} from "./user";

export class Patient {

  private _user_id: number;
  private _dateOfBirth: Date;
  private _gender: string;
  private _allergies: string;
  private _email: string;
  private _firstname: string;
  private _lastname: string;
  private _phonenumber: string;
  private _password: string;


  constructor(user_id?: number, dateOfBirth?: Date, gender?: string, allergies?: string, email?: string, firstname?: string, lastname?: string, phonenumber?: string, password?: string) {
    this._user_id = user_id;
    this._dateOfBirth = dateOfBirth;
    this._gender = gender;
    this._allergies = allergies;
    this._email = email;
    this._firstname = firstname;
    this._lastname = lastname;
    this._phonenumber = phonenumber;
    this._password = password;
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


  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get phonenumber(): string {
    return this._phonenumber;
  }

  set phonenumber(value: string) {
    this._phonenumber = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
