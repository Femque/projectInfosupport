package nl.hva.jpa.test.repository;

import nl.hva.models.User;
import nl.hva.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


/**
 * @Author Thijs van der Pouw Kraan
 * <p>
 * testing user repository
 */
@SpringBootTest
class TestUserRepository {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired // repository is automatically injected into the test instance
    private UserRepository repository;


    @Test
    void testFindingAUser() {
        List<User> u = repository.getUserByUser_id(4);
        assertEquals("Thijs", u.get(0).getFirstname());
    }

//    @Test
//    @DirtiesContext
//    void testAddingAUser() {
//
//        User u = new User(10,
//                "Klaasie",
//                "Molleke",
//                "KlaasJeWeetWel@gmail.com",
//                "0611554324",
//                "testwachtwoord",
//                "1999-09-08",
//                "man");
//
//        repository.save(u);
//
//        assertNotNull(u.getUser_id());
//
//        List<User> users = repository.getUserByUser_id(u.getUser_id());
//
//        assertEquals("Klaasie", users.get(0).getFirstname());
//    }

    @Test
    @DirtiesContext
    void testUpdatingAUser() {

        List<User> u = repository.getUserByUser_id(4);

        u.get(0).setFirstname("updated naam Thijs");

        repository.save(u.get(0));

        u = repository.getUserByUser_id(4);

        assertEquals("updated naam Thijs", u.get(0).getFirstname());

    }


}
