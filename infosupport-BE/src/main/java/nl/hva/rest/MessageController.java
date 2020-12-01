package nl.hva.rest;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nl.hva.models.Message;
import nl.hva.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
