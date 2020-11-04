package app.service;

import app.models.User;
import app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}


