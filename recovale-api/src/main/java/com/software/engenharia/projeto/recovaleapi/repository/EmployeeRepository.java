package com.software.engenharia.projeto.recovaleapi.repository;

import com.software.engenharia.projeto.recovaleapi.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query(value="SELECT * FROM employee WHERE username = ?1 AND password = ?2", nativeQuery = true)
    Employee findByUsernameAndPassword(String username, String password);
}
