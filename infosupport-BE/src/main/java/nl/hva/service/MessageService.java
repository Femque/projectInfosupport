package nl.hva.service;

import lombok.RequiredArgsConstructor;
import nl.hva.models.Message;
import nl.hva.repositories.MessageRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MessageService {

    private final MessageRepository repo;

    public  String insert(String message, String image, LocalDateTime message_time, String video,
                          int gp_user_id, int patient_user_id, int send_by){
        return repo.insert(gp_user_id, image, message, message_time, patient_user_id, video, send_by);
    }

    public void insertMessage(Message message){
         repo.save(message);
    }

}
