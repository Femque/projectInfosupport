import {Time} from "@angular/common";

export class Appointment {

  //All attributes
  public id: number;
  //Later vervangen door patient model
  public patient: string;
  //Later vervangen door gp model

  public gp: string;
  public date: Date;
  public startTime: Date;
  public endTime: Date;
  public description: string;
  public location: string;
  // public isFollowUp: boolean;


  constructor(id?: number, patient?: string, gp?: string, date?: Date, startTime?: Date, endTime?: Date, description?: string, location?: string) {
    this.id = id;
    this.patient = patient;
    this.gp = gp;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
    this.description = description;
  }

//Possible methods go here
}
