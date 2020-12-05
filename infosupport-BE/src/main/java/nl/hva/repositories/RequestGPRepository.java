package nl.hva.repositories;

import nl.hva.models.RequestGP;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RequestGPRepository extends JpaRepository<RequestGP, Integer> {
}
