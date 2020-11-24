package nl.hva.repositories;

import nl.hva.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

  User findByEmailAndPassword(String email, String password);

//  @Query("SELECT user_id, firstname, lastname, email, password FROM User where email =?1 AND password =?2")
//  User findByEmailAndPassword(@Param("email") String email,
//                              @Param("password") String password);

  @Query("SELECT user_id FROM User where email =?1")
  int user_id(@Param("email") String email);
}
