package com.software.engenharia.projeto.recovaleapi.model;

import com.software.engenharia.projeto.recovaleapi.enums.UserType;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "\"user\"")
@Getter
@Setter
@EqualsAndHashCode(of = "id") @ToString(of = "id")
public class User {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Enumerated(EnumType.STRING)
    private UserType type;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String cpf;

    @Column(nullable = false)
    private String password;

    @Column(name = "current_points", nullable = false)
    private int currentPoints;

    @Column(nullable = false)
    private int totalPoints;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}
