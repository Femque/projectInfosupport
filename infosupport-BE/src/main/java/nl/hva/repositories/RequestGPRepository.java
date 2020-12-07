package nl.hva.repositories;

import nl.hva.models.RequestGP;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface RequestGPRepository extends JpaRepository<RequestGP, Integer> {

    @Modifying
    @Query(value = "SELECT * FROM Request_gp r WHERE r.gp_user_id = ?1", nativeQuery = true)
    List<RequestGP> getRequestsByGpUserId(@Param("gp_user_id") int gpUserId);

}
