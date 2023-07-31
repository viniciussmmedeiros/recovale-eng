package com.software.engenharia.projeto.recovaleapi.repository;

import com.software.engenharia.projeto.recovaleapi.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query(value="SELECT * FROM employee WHERE username = ?1 AND password = ?2", nativeQuery = true)
    Employee findByUsernameAndPassword(String username, String password);

    @Query(value="SELECT EXISTS(SELECT 1 FROM employee WHERE username = ?1)", nativeQuery = true)
    boolean findByUsername(String username);

    @Query(value="SELECT * FROM employee WHERE created_by = ?1 AND is_deleted = false", nativeQuery = true)
    List<Employee> findAllByCreator(Long adminId);
}
