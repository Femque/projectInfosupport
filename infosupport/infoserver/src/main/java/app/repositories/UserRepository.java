package app.repositories;

import app.models.Patient;
import app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
//  public User fetchUserById(int id);
//  public User fetchUserByIdAndPassword(int id, String password);

}
