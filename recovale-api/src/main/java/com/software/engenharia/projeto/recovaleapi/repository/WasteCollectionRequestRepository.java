package com.software.engenharia.projeto.recovaleapi.repository;

import com.software.engenharia.projeto.recovaleapi.model.WasteCollectionRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Arrays;
import java.util.List;

public interface WasteCollectionRequestRepository extends JpaRepository<WasteCollectionRequest, Long> {

    @Query(value="SELECT * FROM waste_collection_request WHERE id = ?1", nativeQuery = true)
    WasteCollectionRequest findByRequestId(Long requestId);

    @Query(value="SELECT * FROM waste_collection_request WHERE status = 'SCHEDULED'", nativeQuery = true)
    List<WasteCollectionRequest> findAllScheduled();
}
