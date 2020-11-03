package app.rest;

import app.models.User;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("user")
public class UserController {

  @Autowired
  private UserService service;

  public UserController(UserService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<List<User>> index() {
    List<User> users = service.findAll();
    return ResponseEntity.ok(users);
  }

//  @PostMapping("login")
//  public User loginUser(@RequestBody User user) throws Exception {
//    int tempId = user.getUser_id();
//    String tempPassword = user.getPassword();
//    User userObj = null;
//
//    if (tempId != 0 && tempPassword != null) {
//      userObj = service.fetchUserByIdAndPassword(tempId, tempPassword);
//    }
//
//    //If user doesn't exist
//    if (userObj == null) {
//      throw new Exception("Bad credentials");
//    }
//
//    return userObj;
//  }
}
