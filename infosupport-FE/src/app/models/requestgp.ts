
export class RequestGP {

  patient_user_id: number;
  gp_user_id: number;
  request_gp_id: number;
  full_name: string;


  constructor(patient_user_id: number, gp_user_id: number, full_name?: string, request_gp_id?: number) {
    this.patient_user_id = patient_user_id;
    this.gp_user_id = gp_user_id;
    this.full_name = full_name;
    this.request_gp_id = request_gp_id;
  }
}
