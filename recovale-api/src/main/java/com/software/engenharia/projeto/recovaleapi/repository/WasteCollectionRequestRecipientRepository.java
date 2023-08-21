package com.software.engenharia.projeto.recovaleapi.repository;

import com.software.engenharia.projeto.recovaleapi.model.Reward;
import com.software.engenharia.projeto.recovaleapi.model.WasteCollectionRequestRecipient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface WasteCollectionRequestRecipientRepository extends JpaRepository<WasteCollectionRequestRecipient, Long> {

    @Query(value="SELECT * FROM waste_collection_request_recipient WHERE recipient_id = ?1", nativeQuery = true)
    List<WasteCollectionRequestRecipient> findAllByRecipientId(Long recipientId);

    @Query(value="UPDATE waste_collection_request_recipient SET is_deleted = true WHERE request_id = ?1", nativeQuery = true)
    @Modifying
    @Transactional
    void deleteNotifications(Long requestId);
}
