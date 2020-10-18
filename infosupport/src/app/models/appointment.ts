export class Appointment {

  //All attributes
  public id: number;
  //Later vervangen door patient model
  public patient: string;
  public startTime: Date;
  public endTime: Date;
  public isFollowUp: boolean;


  constructor(id: number, patient: string, startTime: Date, endTime: Date) {
    this.id = id;
    this.patient = patient;
    this.startTime = startTime;
    this.endTime = endTime;
  }

//Possible methods go here
}
