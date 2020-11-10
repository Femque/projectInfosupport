package app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@SpringBootApplication
@ComponentScan("app.repositories")
public class InfoserverApplication {

  private final static Logger log = LoggerFactory.getLogger(InfoserverApplication.class);

  public static void main(String[] args) {
    SpringApplication.run(InfoserverApplication.class, args);
    log.info("Spring-boot-session-management application started succesfully");
  }

}
