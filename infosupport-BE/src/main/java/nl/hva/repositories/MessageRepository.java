package nl.hva.repositories;

import nl.hva.models.General_practitioner;
import nl.hva.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Message (gp_user_id, image, message, message_time, patient_user_id, video, send_by)" +
            "VALUES(?1, ?2, ?3, ?4, ?5, ?6, ?7)", nativeQuery = true)
    void insert(@Param("gp_user_id") int gp_user_id,
                  @Param("image") String image,
                  @Param("message") String message,
                  @Param("message_time")LocalDateTime message_time,
                  @Param("patient_user_id") int patient_user_id,
                  @Param("video") String video,
                  @Param("send_by") int send_by);


    @Modifying
    @Query(value = "SELECT * FROM Message m WHERE m.gp_user_id =?1 AND m.patient_user_id = ?2", nativeQuery = true)
    List<Message> getAllByGp_user_idAndPatient_user_id(@Param("Gp_user_id") int gp_user_id,
                                                       @Param("Patient_user_id") int patient_user_id);




}
