package nl.hva.models;

import javax.persistence.*;

@Entity
@Table(name = "Request_gp")
public class RequestGP {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer request_gp_id;

    private Integer patient_user_id;
    private Integer gp_user_id;

    public Integer getRequest_gp_id() {
        return request_gp_id;
    }

    public void setRequest_gp_id(Integer request_gp_id) {
        this.request_gp_id = request_gp_id;
    }

    public Integer getPatient_user_id() {
        return patient_user_id;
    }

    public void setPatient_user_id(Integer patient_user_id) {
        this.patient_user_id = patient_user_id;
    }

    public Integer getGp_user_id() {
        return gp_user_id;
    }

    public void setGp_user_id(Integer gp_user_id) {
        this.gp_user_id = gp_user_id;
    }
}
