package nl.hva.service;

import lombok.RequiredArgsConstructor;
import nl.hva.models.RequestGP;
import nl.hva.repositories.RequestGPRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestGPService {

    private final RequestGPRepository repository;

    public List<RequestGP> getRequests() {
        return repository.findAll();
    }

    public void createRequest(RequestGP request) {
        repository.save(request);
    }
}
