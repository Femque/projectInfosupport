package nl.hva.jpa.test.controller;


import nl.hva.models.Appointment;
import nl.hva.repositories.AppointmentRepository;
import nl.hva.rest.AppointmentController;
import nl.hva.service.AppointmentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

/**
 * Tests for the appointment rest controller
 * @author Jesse Bijma,
 *
 */
@SpringBootTest
@DirtiesContext
public class AppointmentControllerTests {

    private Logger logger = LoggerFactory.getLogger((this.getClass()));

    //Our service makes use of the repository
    @Autowired
    private AppointmentController controller;

    @BeforeEach
    @Transactional
    void init() {
        Appointment a = new Appointment();
        a.setBig_code(6);
        a.setIs_digital(false);
        a.setEnd_time(LocalDateTime.now());
        a.setStart_time(LocalDateTime.now());
        a.setIs_digital(false);
        a.setIs_follow_up(false);
        a.setPatient_user_id(1);
        a.setLocation("test location");
        a.setTitle("test123");

        Appointment b = new Appointment();
        b.setBig_code(6);
        b.setIs_digital(false);
        b.setEnd_time(LocalDateTime.now());
        b.setStart_time(LocalDateTime.now());
        b.setIs_digital(false);
        b.setIs_follow_up(false);
        b.setPatient_user_id(1);
        b.setLocation("test location");
        b.setTitle("test123");

        Appointment c = new Appointment();
        c.setBig_code(7);
        c.setIs_digital(false);
        c.setEnd_time(LocalDateTime.now());
        c.setStart_time(LocalDateTime.now());
        c.setIs_digital(false);
        c.setIs_follow_up(false);
        c.setPatient_user_id(1);
        c.setLocation("test location");
        c.setTitle("test123");

        controller.store(a);
        controller.store(b);
        controller.store(c);
    }

    @Test
    @Transactional
    void checkAllAppointments() {
        ResponseEntity<List<Appointment>> appointmentList = controller.getAllAppointments();
        assertEquals(3, Objects.requireNonNull(appointmentList.getBody()).size());
    }

    @Test
    @Transactional
    void getAppointmentsForSpecificGP() {
        ResponseEntity<List<Appointment>> list1 = controller.getAppointmentsByBig(6);
        ResponseEntity<List<Appointment>> list2 = controller.getAppointmentsByBig(7);

        assertEquals(2, Objects.requireNonNull(list1.getBody()).size());
        assertEquals(1, Objects.requireNonNull(list2.getBody()).size());
    }



}
