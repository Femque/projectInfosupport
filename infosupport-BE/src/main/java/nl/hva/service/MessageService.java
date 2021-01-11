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

    public void insertMessage(Message message){
         repo.save(message);
    }

    public List<Message> getMessagesForChat(int gp_user_id, int patient_user_id){
        return repo.getAllByGp_user_idAndPatient_user_id(gp_user_id, patient_user_id);
    }

}
