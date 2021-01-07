package nl.hva.jpa.test.controller;

import nl.hva.models.Message;
import nl.hva.rest.MessageController;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 *tests by Bram Osborne for messageRestController
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MessageRestTests {

    @Autowired
    private MessageController controller;

    @Test
    void testHttpStatus() {
        List<Message> list = controller.getMessagesForChat(6, 1).getBody();
        //get responseEntity from controller method
        ResponseEntity<List<Message>> messageResponseEntity = controller.getMessagesForChat(6, 1);
        assertEquals(messageResponseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(messageResponseEntity.getBody(), list);
    }

    @Test
    void testAddingMessage() {
        //make new message
        Message message = new Message(1000, "test", "", LocalDateTime.now(), "", 6, 1, 6);
        //get lenght from list of messages
        int length = controller.getMessagesForChat(6, 1).getBody().size();
        //insert message
        controller.insert(message);

        assertEquals(controller.getMessagesForChat(6, 1).getBody().size(), length +1);
    }

}
