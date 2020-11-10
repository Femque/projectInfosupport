package app.service;

import app.models.User;
import app.repositories.UserRepository;
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
}


