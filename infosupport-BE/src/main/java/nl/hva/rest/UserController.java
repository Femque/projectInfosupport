package nl.hva.rest;

import nl.hva.models.General_practitioner;
import nl.hva.models.Patient;
import nl.hva.models.User;
import nl.hva.service.GeneralPractitionerService;
import nl.hva.service.PatientService;
import nl.hva.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.transaction.Transactional;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {

  private final UserService service;
  private final PatientService p_service;
  private final GeneralPractitionerService gp_service;

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
    for (User user : users) {
      if (user.getEmail().equals(email)) {
        System.out.println(user.getEmail());
        return ResponseEntity.ok(user.getUser_id());
      } else {
        System.out.println("");
      }
    }
    return null;
  }

  @GetMapping(value = "/role")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Boolean> getRole(@RequestParam String email) {
    List<User> users = service.findAll();
    List<Patient> patients = p_service.findAll();
    List<General_practitioner> doctors = gp_service.findAll();

    for (User user : users) {
      if (user.getEmail().equals(email)) {
        int id = user.getUser_id();

        //check if patient
        for (Patient patient : patients) {
          if (id == patient.getUser_id()) {
            System.out.println("LOGIN AS PATIENT");
            return ResponseEntity.ok(true);
          } else {
            //check if doctor
            for (General_practitioner gp : doctors) {
              if (id == gp.getBig_code()) {
                System.out.println("LOGIN AS DOCTOR");
                return ResponseEntity.ok(false);
              }
            }
          }
        }
    }
  }
    return null;
}

  @PutMapping("/update")
  @CrossOrigin
  @Transactional
  public ResponseEntity<User> update(@RequestBody User user) {
    System.out.println("User update" + user.getFirstname());
    service.updateUser(user.getUser_id(), user.getFirstname(), user.getLastname(),
            user.getEmail(), user.getPhonenumber(), user.getPassword(), user.getDateOfBirth());
    return ResponseEntity.ok(user);
  }

  // "user/login"
  @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<User> loginUser(@RequestBody User user) throws Exception {
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

    return ResponseEntity.ok(userObj);
  }

  @CrossOrigin
  @GetMapping("/fullname/{user_id}")
  public ResponseEntity<List<String>> getFullNameByUserId(@PathVariable int user_id){
    List<String> fullName = service.getFullNameByUserId(user_id);
    return ResponseEntity.ok(fullName);
  }


  //getting the data of patient by id
  @CrossOrigin
  @GetMapping("/{id}")
  public ResponseEntity<List<User>> getAllUserDataById(@PathVariable int id) {
    List<User> userData = service.getUser(id);
    return ResponseEntity.ok(userData);
  }
}
