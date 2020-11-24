package nl.hva;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InfosupportBEApplication {

  private final static Logger log = LoggerFactory.getLogger(InfosupportBEApplication.class);

  public static void main(String[] args) {
    SpringApplication.run(InfosupportBEApplication.class, args);
    log.info("Spring-boot-session-management application started succesfully");
  }

}
