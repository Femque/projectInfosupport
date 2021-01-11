package nl.hva.jpa.test.controller;

import nl.hva.models.RequestGP;
import nl.hva.rest.RequestGPController;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Tests for the RequestGP rest controller
 *
 * @author Faris Abahri
 */

@SpringBootTest
@DirtiesContext
public class RequestGPControllerTests {

    private Logger logger = LoggerFactory.getLogger((this.getClass()));

    @Autowired
    private RequestGPController controller;

    @Test
    void testGettingRequests() {
        ResponseEntity<List<RequestGP>> requestGPList = controller.getAllRequests();
        assertEquals(3, Objects.requireNonNull(requestGPList.getBody()).size());
    }

    @Test
    void testGettingRequestsByGp() {
        ResponseEntity<List<RequestGP>> requestGPList = controller.getRequestsByGpUserId(7);
        assertEquals(3, Objects.requireNonNull(requestGPList.getBody()).size());
    }

    @Test
    @Transactional
    void testStoringRequest() {
        RequestGP request = new RequestGP();
        request.setPatient_user_id(5);
        request.setGp_user_id(7);
        request.setFull_name("Jesse Bijma");

        controller.store(request);

        assertNotNull(request.getRequest_gp_id());
    }

}
