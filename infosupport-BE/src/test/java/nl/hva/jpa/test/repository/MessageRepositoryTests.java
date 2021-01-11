package nl.hva.jpa.test.repository;


import lombok.RequiredArgsConstructor;
import nl.hva.models.Message;
import nl.hva.repositories.MessageRepository;
import nl.hva.service.MessageService;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 *tests by Bram Osborne for messageRepository
 */
@SpringBootTest
public class MessageRepositoryTests {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MessageRepository repository;

    @Test
    @DirtiesContext
    void testAddingAMessage(){
        //get list of messages between two users
        List<Message> list = repository.getAllByGp_user_idAndPatient_user_id(6, 1);

        //insert message in database
        repository.insert(6, " ", "test", LocalDateTime.now(), 1, "", 6);

        assertEquals(list.size() +1 , repository.getAllByGp_user_idAndPatient_user_id(6, 1).size());
    }

    @Test
    @DirtiesContext
    void testDeletingAMessage(){
        //get list of messages between two users
        List<Message> list = repository.getAllByGp_user_idAndPatient_user_id(6, 1);
        //insert message in database
        repository.insert(6, " ", "test", LocalDateTime.now(), 1, "", 6);
        //get message from list
        Message message = list.get(1);
        //delete from database
        repository.delete(message);

        assertFalse(repository.getAllByGp_user_idAndPatient_user_id(6,1).contains(message));
    }

    @Test
    @DirtiesContext
    void testUpdateAMessage(){
        //get list of messages between two users
        List<Message> list = repository.getAllByGp_user_idAndPatient_user_id(6, 1);
        //get message from list
        Message message = list.get(1);
        //change message text
        message.setMessage("verandert");
        //update changed message
        repository.save(message);
        //get list that contains updated message
        List<Message> list2 = repository.getAllByGp_user_idAndPatient_user_id(6, 1);
        //get message from list
        Message message1 = list2.get(1);

        assertEquals("verandert", message1.getMessage());





    }
}
