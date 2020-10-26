package app.repositories;

import app.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
  //JpaRepository heeft aan aantal ingebouwde functies, zoals deze findAll
  //Pas op dat je niet perongeluk een functie dezelfde naam geeft als 1 van deze functies
  //Ctrl+click op JpaRepository op regel 13 om ze te kunnen bekijken

  public List<Appointment> findAll();


  //Query's geeft je aan met @Query, en dan tussen haakjes je query
  //Variabelen geef je (volgens mij) aan met ?1, ?2 etc.
  //Deze krijg je dan mee in je functies, test(String email, int id);

//  @Query("SELECT ... FROM Appointment a")
//  public List<Appointment> findSpecific();
  //=?1 =?2 =?3
}
