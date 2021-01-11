package nl.hva.jpa.test.controller;

import nl.hva.models.Appointment;
import nl.hva.models.Patient;
import nl.hva.models.User;
import nl.hva.rest.AppointmentController;
import nl.hva.rest.UserController;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * testing the user controller
 *
 * @author Thijs van der Pouw Kraan
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext
@Transactional
public class UserControllerTests {

    private Logger logger = LoggerFactory.getLogger((this.getClass()));

    @Autowired
    private UserController controller;

    /**
     * test for checking amount of users
     */
    @Test
    void checkAllUsers() {
        ResponseEntity<List<User>> userList = controller.index();
        assertEquals(8, Objects.requireNonNull(userList.getBody()).size());
    }

    /**
     * test for checking firstname of specific user with id
     */
    @Test
    void checkUserById() {
        ResponseEntity<List<User>> userList = controller.getAllUserDataById(4);
        assertEquals("Thijs", userList.getBody().get(0).getFirstname());
    }

    /**
     * test for checking if the user updates right
     */
    @Test
    void checkUpdateUser() {

        //Arrange: getting the user with id 4
        ResponseEntity<List<User>> user = controller.getAllUserDataById(4);

        //Arrange: setting new values to update the user
        user.getBody().get(0).setFirstname("updateFirstName");
        user.getBody().get(0).setLastname("updateLastName");
        user.getBody().get(0).setEmail("updateEmail");
        user.getBody().get(0).setPhonenumber("0654378921");
        user.getBody().get(0).setPassword("updatedPassword");
        String year = "2001";
        String month = "09";
        String day = "08";
        LocalDate birthDate = LocalDate.of(Integer.parseInt(year), Integer.parseInt(month), Integer.parseInt(day));
        user.getBody().get(0).setDateOfBirth(birthDate);

        // Act: set new values to the user with id 4
        ResponseEntity<User> updateCreationResult = this.controller.update(user.getBody().get(0));

        // Assert: Checking if the response is correct
        assertEquals(updateCreationResult.getStatusCode(), HttpStatus.OK);
        assertNotNull(updateCreationResult.getBody().getUser_id());
        assertEquals(user.getBody().get(0).getFirstname(), updateCreationResult.getBody().getFirstname());
        assertEquals(user.getBody().get(0).getLastname(), updateCreationResult.getBody().getLastname());
        assertEquals(user.getBody().get(0).getEmail(), updateCreationResult.getBody().getEmail());
        assertEquals(user.getBody().get(0).getPhonenumber(), updateCreationResult.getBody().getPhonenumber());
        assertEquals(user.getBody().get(0).getPassword(), updateCreationResult.getBody().getPassword());
        assertEquals(user.getBody().get(0).getDateOfBirth(), updateCreationResult.getBody().getDateOfBirth());

        // Act: Cross-check results - was the user persisted?
        ResponseEntity<List<User>> userCheckResult = controller.getAllUserDataById(4);

        // Assert: Check if data is correct
        assertEquals(userCheckResult.getStatusCode(), HttpStatus.OK);
        assertEquals(userCheckResult.getBody().get(0).getFirstname(), updateCreationResult.getBody().getFirstname());
        assertEquals(userCheckResult.getBody().get(0).getLastname(), updateCreationResult.getBody().getLastname());
        assertEquals(userCheckResult.getBody().get(0).getEmail(), updateCreationResult.getBody().getEmail());
        assertEquals(userCheckResult.getBody().get(0).getPhonenumber(), updateCreationResult.getBody().getPhonenumber());
        assertEquals(userCheckResult.getBody().get(0).getPassword(), updateCreationResult.getBody().getPassword());
        assertEquals(userCheckResult.getBody().get(0).getDateOfBirth(), updateCreationResult.getBody().getDateOfBirth());
    }

}
