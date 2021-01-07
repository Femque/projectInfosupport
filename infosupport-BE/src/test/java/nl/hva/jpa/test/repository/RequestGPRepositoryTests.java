package nl.hva.jpa.test.repository;

import nl.hva.models.RequestGP;
import nl.hva.repositories.RequestGPRepository;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Tests for the RequestGP repository
 *
 * @author Faris Abahri
 */

public class RequestGPRepositoryTests {

    private Logger logger = LoggerFactory.getLogger((this.getClass()));

    @Autowired
    private RequestGPRepository repo;

    @Test
    void testGettingRequestsByGpUserId() {
        List<RequestGP> requests = repo.getRequestsByGpUserId(7);
        assertEquals(7, requests.get(0).getGp_user_id());
    }
}
