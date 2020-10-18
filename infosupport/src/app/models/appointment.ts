export class Appointment {

  //All attributes
  public id: number;
  //Later vervangen door patient model
  public patient: string;
  public gp: string;
  public startTime: Date;
  public endTime: Date;
  public isFollowUp: boolean;


  constructor(id: number, patient: string, gp: string, startTime: Date, endTime: Date, isFollowUp: boolean) {
    this.id = id;
    this.patient = patient;
    this.gp = gp;
    this.startTime = startTime;
    this.endTime = endTime;
    this.isFollowUp = isFollowUp;
  }

//Possible methods go here
}
