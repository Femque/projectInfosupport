package nl.hva.rest;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nl.hva.models.Message;
import nl.hva.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/chat")
public class MessageController {

    private final MessageService service;

    @CrossOrigin
    @PostMapping("/message")
    public void insert(@RequestBody Message message){
        System.out.println(message);
        service.insertMessage(message);
    }

    @CrossOrigin
    @GetMapping("/messagesForChat/{gp_user_id}/{patient_user_id}")
    public ResponseEntity<List<Message>> getMessagesForChat(@PathVariable int gp_user_id, @PathVariable int patient_user_id){
        List<Message> messages = service.getMessagesForChat(gp_user_id, patient_user_id);

       return  ResponseEntity.ok(messages);
    }

}
