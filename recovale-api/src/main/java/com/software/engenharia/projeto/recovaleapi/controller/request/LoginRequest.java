package com.software.engenharia.projeto.recovaleapi.controller.request;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotBlank;

@Getter
@Setter
public class LoginRequest {
    @NotBlank(message="username não pode ser vazio.")
    private String username;

    @Column(name = "\"password\"")
    @NotBlank(message="password não pode ser vazio.")
    private String password;
}
