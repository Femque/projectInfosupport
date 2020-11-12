package app.repositories;

import app.models.GeneralPractitioner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralPractitionerRepository extends JpaRepository<GeneralPractitioner, Integer> {
}
