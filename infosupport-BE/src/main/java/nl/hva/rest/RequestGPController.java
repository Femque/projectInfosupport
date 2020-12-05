package nl.hva.rest;

import lombok.RequiredArgsConstructor;
import nl.hva.models.Appointment;
import nl.hva.models.RequestGP;
import nl.hva.service.RequestGPService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class RequestGPController {

    private final RequestGPService service;

    @GetMapping("/requests")
    @CrossOrigin
    public ResponseEntity<List<RequestGP>> getAllRequests() {
        List<RequestGP> requests = service.getRequests();
        System.out.println(requests.get(0).getRequest_gp_id());

        return ResponseEntity.ok(requests);
    }

    @PostMapping("/requests/create")
    @CrossOrigin
    @Transactional
    public ResponseEntity<RequestGP> store(@RequestBody RequestGP request) {
        System.out.println(request);
        service.createRequest(request);
        return ResponseEntity.ok(request);
    }
}
