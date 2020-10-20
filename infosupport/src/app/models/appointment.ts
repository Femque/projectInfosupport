export class Appointment {

  //All attributes
  public id: number;
  //Later vervangen door patient model
  public patient: string;
  public startTime: Date;
  public endTime: Date;
  public location: String;
  public isFollowUp: boolean;
  public description: string;


  constructor(id: number, patient: string, startTime: Date, endTime: Date, location: String, description: string) {
    this.id = id;
    this.patient = patient;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
    this.description = description;
  }

//Possible methods go here
}
