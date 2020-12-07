package nl.hva.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unchecked")
@Controller
public class SessionController {

  private static final String MY_SESSION_NOTES = "Session_notes";
  private static final Logger log = LoggerFactory.getLogger(SessionController.class);

  @GetMapping(value = "/index")
  public String home(final Model model, final HttpSession session) {
    final List<String> notes = (List<String>) session.getAttribute(MY_SESSION_NOTES);
    model.addAttribute("sessionNotes", !CollectionUtils.isEmpty(notes) ? notes : new ArrayList<>());
    return "home"; //Return to the page rendered on the browser
  }

  @PostMapping(value = "/save/note")
  public String saveNote(@RequestParam("note") final String note, final HttpServletRequest request) {
    //Get the notes from request session
    List<String> notes = (List<String>) request.getSession().getAttribute(MY_SESSION_NOTES);

    //Check if session is present or not
    if (CollectionUtils.isEmpty(notes)) {
      log.info("No notes in session to fetch, setting the value in session object");
      notes = new ArrayList<>();
    }

    notes.add(note);
    request.getSession().setAttribute(MY_SESSION_NOTES, notes);
    return "redirect:/index";
  }

  @PostMapping(value = "/destroy/session")
  public String destroySession(final HttpServletRequest request) {
    log.info("Removing session data");
    //Invalidate and clear data
    request.getSession().invalidate();
    return "redirect:/index";
  }
}
