package com.software.engenharia.projeto.recovaleapi.controller.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCreatedAccountRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
