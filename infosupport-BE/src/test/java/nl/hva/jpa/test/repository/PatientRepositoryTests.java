package nl.hva.jpa.test.repository;

import nl.hva.models.Patient;
import nl.hva.repositories.PatientRepository;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

/**
 * @author Femke Hofland
 * Tests for patient repository
 */
@SpringBootTest
public class PatientRepositoryTests {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private PatientRepository repo;

    @Test
    void test_getPatientByUser_id() {
        List<Patient> p = repo.getPatientByUser_id(2);
        assertEquals("Vrouw", p.get(0).getGender());
    }

    @Test
    void test_getGPByPatientUserId() {
        int gp_user_id = repo.getGPByPatientUserId(2);
        assertEquals(6, gp_user_id);
    }

    @Test
    void test_getPatients() {
        List<Patient> p = repo.getPatients(7);
        assertEquals("Man", p.get(0).getGender());
        assertNull(p.get(0).getAllergies());
    }
}
