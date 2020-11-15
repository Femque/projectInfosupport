import {Time} from "@angular/common";

export class Appointment {

  appointment_code: number;
  start_time: Date;
  end_time: Date;
  is_digital: boolean;
  description: string;
  location: string;
  is_follow_up: boolean;
  big_code: number;
  patient_user_id: number;
  title: string
  constructor( start_time?: Date, end_time?: Date, is_digital?: boolean, description?: string, location?: string, is_follow_up?: boolean, big_code?: number, patient_user_id?: number, appointment_code?: number, title?: string) {
    this.start_time = start_time;
    this.end_time = end_time;
    this.is_digital = is_digital;
    this.description = description;
    this.location = location;
    this.is_follow_up = is_follow_up;
    this.big_code = big_code;
    this.patient_user_id = patient_user_id;
    this.appointment_code = appointment_code;
    this.title = title
  }

//Possible methods go here
}
