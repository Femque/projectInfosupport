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
 * tests by Bram Osborne for messageRepository
 */
@SpringBootTest
public class MessageRepositoryTests {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MessageRepository repository;

    @Test
    @DirtiesContext
    void testAddingAMessage() {
        //arrange
        List<Message> list = repository.getAllByGp_user_idAndPatient_user_id(6, 1);

        //act
        repository.insert(6, " ", "test", LocalDateTime.now(), 1, "", 6);

        //assert
        assertEquals(list.size() + 1, repository.getAllByGp_user_idAndPatient_user_id(6, 1).size());
    }

    @Test
    @DirtiesContext
    void testDeletingAMessage() {
        //arrange
        List<Message> list = repository.getAllByGp_user_idAndPatient_user_id(6, 1);
        //act
        repository.insert(6, " ", "test", LocalDateTime.now(), 1, "", 6);
        Message message = list.get(1);
        repository.delete(message);

        //assert
        assertFalse(repository.getAllByGp_user_idAndPatient_user_id(6, 1).contains(message));
    }

    @Test
    @DirtiesContext
    void testUpdateAMessage() {
        //arrange
        List<Message> list = repository.getAllByGp_user_idAndPatient_user_id(6, 1);
        Message message = list.get(1);
        message.setMessage("verandert");

        //act
        repository.save(message);
        List<Message> list2 = repository.getAllByGp_user_idAndPatient_user_id(6, 1);
        Message message1 = list2.get(1);

        //assert
        assertEquals("verandert", message1.getMessage());


    }
}
