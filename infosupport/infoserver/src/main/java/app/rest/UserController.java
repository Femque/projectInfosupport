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

  //Fetch id
  @GetMapping(value = "/id")
  @CrossOrigin
  public int findId(@RequestBody User user) throws Exception {
    String tempEmail = user.getEmail();
    int userId = 0;

    if (tempEmail != null) {
      userId = service.user_id(tempEmail);
    }

    if (userId == 0) {
      throw new Exception("Doesn't exist");
    }

    return userId;
  }

  // "user/login"
  @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
  @CrossOrigin(origins = "http://localhost:4200")
  public User loginUser(@RequestBody User user) throws Exception {
    String tempEmail = user.getEmail();
    String tempPassword = user.getPassword();

    User userObj = null;
    int user_id = 0;

    if (tempEmail != null && tempPassword != null) {
      userObj = service.findUserByEmailAndPassword(tempEmail, tempPassword);
      user_id = userObj.getUser_id();
    }

    //If user doesn't exist
    if (userObj == null) {
      throw new Exception("Bad credentials");
    }

    return userObj;
  }
}
