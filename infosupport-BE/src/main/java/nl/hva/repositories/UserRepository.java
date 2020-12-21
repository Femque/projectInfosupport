package nl.hva.repositories;

import nl.hva.models.Appointment;
import nl.hva.models.Patient;
import nl.hva.models.User;
import nl.hva.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

  User findByEmailAndPassword(String email, String password);

//  @Query("SELECT user_id, firstname, lastname, email, password FROM User where email =?1 AND password =?2")
//  User findByEmailAndPassword(@Param("email") String email,
//                              @Param("password") String password);

  @Modifying
  @Query("Update User p Set p.firstname = ?1 ,p.lastname = ?2,  " +
          "p.email = ?3, " +
          "p.phonenumber = ?4, p.password = ?5, p.dateOfBirth = ?6 where p.user_id = ?7")
  void saveUserBy(
          @Param("firstname") String firstname,
          @Param("lastname") String lastname,
          @Param("email") String email,
          @Param("phonenumber") String phonenumber,
          @Param("password") String password,
          @Param("dateOfBirth") LocalDate dateOfBirth,
          @Param("user_id") int user_id
  );

  @Query(
          value = "SELECT * FROM User u WHERE u.user_id = ?1",
          nativeQuery = true)
  List<User> getUserByUser_id(@Param("user_id") int user_id);

  @Query("SELECT user_id FROM User where email =?1")
  int user_id(@Param("email") String email);

  @Query("SELECT u.firstname, u.lastname FROM User u WHERE u.user_id = ?1")
  List<String> getFullNameByUserId(@Param("user_id") int user_id);
}
