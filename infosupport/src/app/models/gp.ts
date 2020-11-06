import {User} from "./user";

export class GP extends User{

  private _big_code: number;
  private _specialty: String;


  constructor() {
    super();
  }

  get big_code(): number {
    return this._big_code;
  }

  set big_code(value: number) {
    this._big_code = value;
  }

  get specialty(): String {
    return this._specialty;
  }

  set specialty(value: String) {
    this._specialty = value;
  }
}
