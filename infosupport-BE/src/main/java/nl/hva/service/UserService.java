package nl.hva.service;

import nl.hva.models.User;
import nl.hva.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository repo;

  public User findUserByEmailAndPassword(String email, String password) {
    return repo.findByEmailAndPassword(email, password);
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


