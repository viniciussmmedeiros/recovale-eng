package com.software.engenharia.projeto.recovaleapi.repository;

import com.software.engenharia.projeto.recovaleapi.model.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RewardRepository extends JpaRepository<Reward, Long> {
    @Query(value="SELECT * FROM reward WHERE is_deleted = false AND quantity_available > 0", nativeQuery = true)
    List<Reward> listAll();

    @Query(value="SELECT * FROM reward WHERE points <= ?1 AND is_deleted = false AND quantity_available > 0", nativeQuery = true)
    List<Reward> listByFilter(Integer pointsFilter);
}
