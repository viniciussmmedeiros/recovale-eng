package com.software.engenharia.projeto.recovaleapi.repository;

import com.software.engenharia.projeto.recovaleapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value="SELECT * FROM \"user\" WHERE username = ?1 AND password = ?2", nativeQuery = true)
    User findByUsernameAndPassword(String username, String password);

    @Query(value="SELECT EXISTS(SELECT 1 FROM \"user\" WHERE username = ?1)", nativeQuery = true)
    boolean findByUsername(String username);

    @Query(value="SELECT EXISTS(SELECT 1 FROM \"user\" WHERE email = ?1)", nativeQuery = true)
    boolean findByEmail(String username);

    @Query(value="SELECT EXISTS(SELECT 1 FROM \"user\" WHERE cpf = ?1)", nativeQuery = true)
    boolean findByCpfCnpj(String cpf);

    @Query(value = "SELECT * FROM \"user\" WHERE type = ?1", nativeQuery = true)
    List<User> findAllByType(String type);
}
