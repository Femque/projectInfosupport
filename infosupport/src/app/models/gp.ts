import {User} from "./user";

export class GP {

  private _big_code: number;
  private _specialty: string;


  constructor() {
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
}
