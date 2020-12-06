package nl.hva.repositories;

import nl.hva.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
    @Query(
            value = "SELECT * FROM Patient p WHERE p.user_id = ?1",
            nativeQuery = true)
    List<Patient> getPatientByUser_id(@Param("user_id") int user_id);

    @Modifying
    @Query("Update Patient p Set p.user_id =?1,p.email = ?2 ,p.firstname = ?3,  " +
            "p.lastname = ?4, p.password = ?5 , " +
            "p.phonenumber = ?6, p.dateOfBirth = ?7, p.allergies = ?8 where p.user_id = ?1")
    void savePatientBy(@Param("user_id") int user_id,
                       @Param("email") String email,
                       @Param("firstname") String firstname,
                       @Param("lastname") String lastname,
                       @Param("password") String password,
                       @Param("phonenumber") String phonenumber,
                       @Param("dateOfBirth") LocalDate dateOfBirth,
                       @Param("allergies") String allergies
                       );

    @Query(value = "SELECT p.gp_user_id FROM Patient p WHERE p.user_id = ?1", nativeQuery = true)
    Integer getGPByPatientUserId(@Param("user_id") Integer user_id);

    @Modifying
    @Query(value = "SELECT * FROM Patient p WHERE p.gp_user_id = ?1", nativeQuery = true)
    List<Patient> getPatients(@Param("gp_user_id") int gp_user_id);

}
