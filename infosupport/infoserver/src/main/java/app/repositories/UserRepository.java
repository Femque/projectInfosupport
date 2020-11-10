package app.repositories;

import app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

  @Query("SELECT user_id, firstname, lastname, email, password FROM User where email =?1 AND password =?2")
  User findByEmailAndPassword(@Param("email") String email,
                              @Param("password") String password);

  @Query("SELECT user_id FROM User where email =?1")
  int user_id(@Param("email") String email);
}
