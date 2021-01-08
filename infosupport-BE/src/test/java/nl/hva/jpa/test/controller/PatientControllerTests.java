package nl.hva.jpa.test.controller;

import nl.hva.models.Patient;
import nl.hva.rest.PatientContoller;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.List;
import java.util.Objects;

/**
 * @author Femke Hofland
 * Tests for patient controller
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PatientControllerTests {

    @Autowired
    private PatientContoller patientContoller;

    @Test
    void testShouldGetPatients() {
        ResponseEntity<List<Patient>> patients = patientContoller.index();
        assertEquals(5, patients.getBody().size());
    }

    @Test
    @DirtiesContext
    void testShouldGetPatientData() {
        ResponseEntity<List<Patient>> patientData = patientContoller.getAllPatientDataById(2);
        assertEquals(1, patientData.getBody().size());
    }

    @Test
    @DirtiesContext
    void testShouldUpdateGP() {
        //Check how many patients the doctor with gp_user_id  6 has
        ResponseEntity<List<Patient>> amountOfpatients = patientContoller.getPatientsForGp(6);
        assertEquals(4, amountOfpatients.getBody().size());

        //Check how many patients the doctor with gp_user_id  7 has
        ResponseEntity<List<Patient>> amountOfpatients2 = patientContoller.getPatientsForGp(7);
        assertEquals(1, amountOfpatients2.getBody().size());

        //Change patient to a different doctor
        ResponseEntity<Integer> update = patientContoller.update(7, 2);

        //Check how many patients the doctor with gp_user_id  7 has after update
        ResponseEntity<List<Patient>> amountOfpatients3 = patientContoller.getPatientsForGp(7);
        assertEquals(2, amountOfpatients3.getBody().size());

    }
}
