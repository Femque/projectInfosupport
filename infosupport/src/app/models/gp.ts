export class GP {

  public big_code: String;
  public specialty: String;
  public user_id: number;


  constructor(big_code?: String, specialty?: String, user_id?: number) {
    this.big_code = big_code;
    this.specialty = specialty;
    this.user_id = user_id;
  }
}
