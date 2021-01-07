package nl.hva;

import nl.hva.models.Appointment;
import nl.hva.repositories.AppointmentRepository;
import nl.hva.service.AppointmentService;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDateTime;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

/**
 * Tests for the appointment repo
 *
 * @author Jesse Bijma,
 */

@SpringBootTest
public class AppointmentRepoTests {

    private Logger logger = LoggerFactory.getLogger((this.getClass()));

    //Our service makes use of the repository
    @Autowired
    private AppointmentRepository repository;

    //Jesse Bijma
    @Test
    void testGettingAnAppointment() {
        Appointment a = repository.getByAppointmentCode(344455634);
        assertEquals(344455634, a.getAppointment_code());
    }

    //Jesse Bijma
    @Test
    @DirtiesContext
    void testCreatingAppointment() {
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

        a = repository.save(a);

        assertNotNull(a.getAppointment_code());

        a = repository.getByAppointmentCode(a.getAppointment_code());

        assertEquals("test123", a.getTitle());
    }

    //Jesse Bijma
    @Test
    @DirtiesContext
    void testDeletingAppointment() {
        Appointment a = repository.getByAppointmentCode(344455634);
        repository.deleteById(344455634);

        Appointment b = repository.getByAppointmentCode(344455634);
        assertNull(b);
    }

    //Jesse Bijma
    @Test
    @DirtiesContext
    void testUpdateAppointment() {
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

        a = repository.save(a);

        assertNotNull(a.getAppointment_code());

        a = repository.getByAppointmentCode(a.getAppointment_code());

        assertEquals("test123", a.getTitle());

        a.setTitle("test321");
        a = repository.save(a);

        assertEquals("test321", a.getTitle());
    }
}
