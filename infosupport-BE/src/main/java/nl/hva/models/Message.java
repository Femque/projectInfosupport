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
}
