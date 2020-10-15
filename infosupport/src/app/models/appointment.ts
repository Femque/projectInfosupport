export class Appointment {

  //All attributes
  public id: number;
  //Later vervangen door patient model
  public patient: string;
  public gp: string;
  public date: string;
  public isFollowUp: boolean;

  constructor(id: number, patient: string, gp: string, date: string, isFollowUp: boolean) {
    this.id = id;
    this.patient = patient;
    this.gp = gp;
    this.date = date;
    this.isFollowUp = isFollowUp;
  }

  //Possible methods go here
}
