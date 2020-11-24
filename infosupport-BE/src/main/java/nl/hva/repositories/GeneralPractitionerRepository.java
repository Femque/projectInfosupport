package nl.hva.repositories;

import nl.hva.models.General_practitioner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralPractitionerRepository extends JpaRepository<General_practitioner, Integer> {

  @Query("SELECT g.big_code FROM General_practitioner g WHERE g.user_id = ?1")
  Integer findBigCodeByUserId(@Param("user_id") Integer user_id);

}
