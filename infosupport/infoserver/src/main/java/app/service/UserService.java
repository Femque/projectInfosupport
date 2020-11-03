package app.service;

import app.models.User;
import app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

  @Autowired
  private UserRepository repo;

  public UserService(UserRepository repo) {
    this.repo = repo;
  }

  public Optional<User> fetchUserById(int id) {
    return repo.findById(id);
  }

  public User fetchUserByIdAndPassword(int id, String password) {
    return repo.fetchUserByIdAndPassword(id, password);
  }

  public List<User> findAll() {
    return repo.findAll();
  }
}
