package com.software.engenharia.projeto.recovaleapi.model;

import com.software.engenharia.projeto.recovaleapi.enums.AccountType;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "id") @ToString(of = "id")
public class Employee {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private AccountType type;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;
}
