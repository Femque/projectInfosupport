package nl.hva.service;

import nl.hva.models.Patient;
import nl.hva.models.User;
import nl.hva.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository repo;

  public User findUserByEmailAndPassword(String email, String password) {
    return repo.findByEmailAndPassword(email, password);
  }

  public void updateUser(int user_id,String firstname, String lastname, String email,
                            String phoneNumber, String password, LocalDate dateOfBirth){
    repo.saveUserBy(firstname, lastname, email,
            phoneNumber, password, dateOfBirth,user_id);
  }

  //find specific user with ID
  public List<User> getUser(int user_id){
    return repo.getUserByUser_id(user_id);
  }

  public List<User> findAll() {
    return repo.findAll();
  }

  public int user_id(String email) {
    return repo.user_id(email);
  }

  public List<String> getFullNameByUserId(int userId) {
    return repo.getFullNameByUserId(userId);
  }
}


