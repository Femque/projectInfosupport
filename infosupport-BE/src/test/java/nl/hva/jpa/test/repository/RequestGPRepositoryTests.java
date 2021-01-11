package nl.hva.jpa.test.repository;

import nl.hva.models.RequestGP;
import nl.hva.repositories.RequestGPRepository;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import javax.transaction.Transactional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for the RequestGP repository
 *
 * @author Faris Abahri
 */

@SpringBootTest
@DirtiesContext
@Transactional
public class RequestGPRepositoryTests {

    private Logger logger = LoggerFactory.getLogger((this.getClass()));

    @Autowired
    private RequestGPRepository repo;

    //Test for creating a request for a new GP
    @Test
    void testCreatingRequest() {
        RequestGP request = new RequestGP();
        request.setPatient_user_id(5);
        request.setGp_user_id(7);
        request.setFull_name("Jesse Bijma");

        request = repo.save(request);

        assertNotNull(request.getRequest_gp_id());
    }

    //Test for deleting a request for a new GP
    @Test
    void testDeletingRequest() {
        //Getting the requests of GP with thr id 7
        List<RequestGP> requestGPList = repo.getRequestsByGpUserId(7);
        System.out.println(requestGPList);

        //Deleting the request
        RequestGP request = requestGPList.get(2);
        repo.delete(request);

        //Checking if the request is deleted
        assertFalse(repo.getRequestsByGpUserId(7).contains(request));
    }
}
