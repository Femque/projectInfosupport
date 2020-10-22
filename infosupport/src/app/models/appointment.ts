import {Time} from "@angular/common";

export class Appointment {

  //All attributes
  public id: number;
  //Later vervangen door patient model
  public patient: string;
  //Later vervangen door gp model

  public gp: string;
  public startTime: Date;
  public endTime: Date;
  public description: string;
  public location: string;
  // public isFollowUp: boolean;


  constructor(id?: number, patient?: string, gp?: string, startTime?: Date, endTime?: Date,  description?: string, location?: string) {
    this.id = id;
    this.patient = patient;
    this.gp = gp;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
    this.description = description;
  }

//Possible methods go here
}
