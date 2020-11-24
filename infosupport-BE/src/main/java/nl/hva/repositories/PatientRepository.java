package nl.hva.repositories;

import nl.hva.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
  @Query(
    value = "SELECT * FROM Patient p WHERE p.user_id = ?1",
    nativeQuery = true)
  List<Patient> getPatientByUser_id(@Param("user_id") int user_id);

}
