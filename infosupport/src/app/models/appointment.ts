import {Time} from "@angular/common";

export class Appointment {

  //All attributes
  public id: number;
  //Later vervangen door patient model
  public patient: string;
  //Later vervangen door gp model

  public gp: string;
  public date: Date;
  public startTime: Time;
  public endTime: Time;
  public description: string;
  public location: string;
  // public isFollowUp: boolean;


  constructor(id?: number, patient?: string, gp?: string, date?: Date, startTime?: Time, endTime?: Time, description?: string, location?: string) {
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
