package com.software.engenharia.projeto.recovaleapi.controller.response;

import com.software.engenharia.projeto.recovaleapi.enums.AccountType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private Long id;
    @Enumerated(EnumType.STRING)
    private AccountType type;
    private String username;
    private String email;
    private String cpf;
}
