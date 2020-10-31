package app.rest;

import app.models.Patient;
import app.models.User;
import app.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

  private UserRepository repository;

  UserController(UserRepository repository) {
    this.repository = repository;
  }
  @RequestMapping("/login")
  public boolean login(@RequestBody User user) {
    return user.getUser_id().equals("id") && user.getPassword().equals("password");
  }

  @RequestMapping("/user")
  public Principal user(HttpServletRequest request) {
    String authToken = request.getHeader("Authorization")
      .substring("Basic".length()).trim();
    return () -> new String(Base64.getDecoder().decode(authToken)).split(":")[0];
  }

  @GetMapping("/users")
  List<User> all() {
    return repository.findAll();
  }

  // find patient by id
  @GetMapping("/users/{id}")
  Optional<User> user(@PathVariable Integer id){
    return repository.findById(id);

  }
}

