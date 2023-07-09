package com.software.engenharia.projeto.recovaleapi.controller.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegistrationRequest {
    @NotBlank
    private String username;

    @Email
    @NotNull
    private String email;

    @NotBlank
    private String cpf;

    @Column(name = "\"password\"")
    @NotBlank
    private String password;
}
