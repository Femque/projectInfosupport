package nl.hva.models;


import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int message_id;

    String message;
    String image;
    LocalDateTime message_time;
    String video;
    int gp_user_id;
    int patient_user_id;
    int send_by;

    public Message(int message_id, String message, String image, LocalDateTime message_time, String video, int gp_user_id, int patient_user_id, int send_by) {
        this.message_id = message_id;
        this.message = message;
        this.image = image;
        this.message_time = message_time;
        this.video = video;
        this.gp_user_id = gp_user_id;
        this.patient_user_id = patient_user_id;
        this.send_by = send_by;
    }


    public Message(){

    }
    public int getMessage_id() {
        return message_id;
    }

    public void setMessage_id(int message_id) {
        this.message_id = message_id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDateTime getMessage_time() {
        return message_time;
    }

    public void setMessage_time(LocalDateTime message_time) {
        this.message_time = message_time;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public int getGp_user_id() {
        return gp_user_id;
    }

    public void setGp_user_id(int gp_user_id) {
        this.gp_user_id = gp_user_id;
    }

    public int getPatient_user_id() {
        return patient_user_id;
    }

    public void setPatient_user_id(int patient_user_id) {
        this.patient_user_id = patient_user_id;
    }

    public int getSend_by() {
        return send_by;
    }

    public void setSend_by(int send_by) {
        this.send_by = send_by;
    }
}
