package nl.hva;


import nl.hva.models.Appointment;
import nl.hva.repositories.AppointmentRepository;
import nl.hva.rest.AppointmentController;
import nl.hva.service.AppointmentService;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

/**
 * Tests for the appointment rest controller
 * @author Jesse Bijma,
 *
 */
@SpringBootTest
public class AppointmentControllerTests {

    private Logger logger = LoggerFactory.getLogger((this.getClass()));

    //Our service makes use of the repository
    @Autowired
    private AppointmentController controller;

    @Test
    void checkAllAppointments() {
        ResponseEntity<List<Appointment>> appointmentList = controller.getAllAppointments();
        assertEquals(6, appointmentList.getBody().size());
    }

}
