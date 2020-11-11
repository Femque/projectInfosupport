package app.rest;

import app.models.User;
import app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {

  private final UserService service;

  // "/user"
  @GetMapping
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<User>> index() {
    List<User> users = service.findAll();

    return ResponseEntity.ok(users);
  }

  @GetMapping(value = "/id")
  @CrossOrigin
  public ResponseEntity<Integer> getId(@RequestParam String email) {
    List<User> users = service.findAll();
    for(User user : users) {
      if (user.getEmail().equals(email)) {
        System.out.println(user.getEmail());
        return ResponseEntity.ok(user.getUser_id());
      } else {
        System.out.println("elp");
      }
    }
    return null;
  }

  // "user/login"
  @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
  @CrossOrigin(origins = "http://localhost:4200")
  public User loginUser(@RequestBody User user) throws Exception {
    String tempEmail = user.getEmail();
    String tempPassword = user.getPassword();

    User userObj = null;

    if (tempEmail != null && tempPassword != null) {
      userObj = service.findUserByEmailAndPassword(tempEmail, tempPassword);
    }

    //If user doesn't exist
    if (userObj == null) {
      throw new Exception("Bad credentials");
    }

    return userObj;
  }
}
