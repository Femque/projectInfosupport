export class Message {

  message: string;
  image: string;
  message_time: Date;
  video: string;
  gp_user_id: number;
  patient_user_id: number;
  send_by: number;


  constructor(message: string, image: string, message_time: Date, video: string, gp_user_id: number, patient_user_id: number, send_by: number) {

    this.message = message;
    this.image = image;
    this.message_time = message_time;
    this.video = video;
    this.gp_user_id = gp_user_id;
    this.patient_user_id = patient_user_id;
    this.send_by = send_by;
  }
}
