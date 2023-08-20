package com.software.engenharia.projeto.recovaleapi.repository;


import com.software.engenharia.projeto.recovaleapi.model.CollectionPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Arrays;
import java.util.List;

public interface CollectionPointRepository extends JpaRepository<CollectionPoint, Long> {

    @Query(value = "SELECT * FROM collection_point WHERE approved = false", nativeQuery = true)
    List<CollectionPoint> findAllPendingRequests();
}
