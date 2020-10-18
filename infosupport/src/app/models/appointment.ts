export class Appointment {

  //All attributes
  public id: number;
  //Later vervangen door patient model
  public patient: string;
  public startTime: Date;
  public endTime: Date;
  public location: String;
  public isFollowUp: boolean;


  constructor(id: number, patient: string, startTime: Date, endTime: Date, location: String) {
    this.id = id;
    this.patient = patient;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
  }

//Possible methods go here
}
