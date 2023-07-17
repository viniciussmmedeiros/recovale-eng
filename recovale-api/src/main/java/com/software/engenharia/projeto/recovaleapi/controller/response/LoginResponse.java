package com.software.engenharia.projeto.recovaleapi.controller.response;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private Long id;
    @Enumerated(EnumType.STRING)
    private String type;
    private String username;
    private String email;
    private String cpf;
    private String password;
}
