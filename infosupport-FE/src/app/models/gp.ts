import {User} from "./user";

export class GP {

  private _big_code: number;
  private _specialty: string;
  private _user_id: number;
  private _email: string;
  private _firstname: string;
  private _lastname: string;
  private _password: string;
  private _phonenumber: number;


  constructor(big_code?: number, specialty?: string, user_id?: number, email?: string, firstname?: string, lastname?: string, password?: string, phonenumber?: number) {
    this._big_code = big_code;
    this._specialty = specialty;
    this._user_id = user_id;
    this._email = email;
    this._firstname = firstname;
    this._lastname = lastname;
    this._password = password;
    this._phonenumber = phonenumber;
  }

  get big_code(): number {
    return this._big_code;
  }

  set big_code(value: number) {
    this._big_code = value;
  }

  get specialty(): string {
    return this._specialty;
  }

  set specialty(value: string) {
    this._specialty = value;
  }

  get user_id(): number {
    return this._user_id;
  }

  set user_id(value: number) {
    this._user_id = value;
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

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get phonenumber(): number {
    return this._phonenumber;
  }

  set phonenumber(value: number) {
    this._phonenumber = value;
  }
}
