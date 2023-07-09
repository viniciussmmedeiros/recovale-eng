package com.software.engenharia.projeto.recovaleapi.controller.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    @NotBlank
    private String username;

    @Column(name = "\"password\"")
    @NotBlank
    private String password;
}
