
export class RequestGP {

  patient_user_id: number;
  gp_user_id: number;
  request_gp_id: number;
  fullname: string;


  constructor(patient_user_id: number, gp_user_id: number, request_gp_id?: number, fullname?: string) {
    this.patient_user_id = patient_user_id;
    this.gp_user_id = gp_user_id;
    this.request_gp_id = request_gp_id;
    this.fullname = fullname;
  }
}
