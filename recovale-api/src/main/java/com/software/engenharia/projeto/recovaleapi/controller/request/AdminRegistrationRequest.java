package com.software.engenharia.projeto.recovaleapi.controller.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminRegistrationRequest {
    private String username;
    private String password;
    private Long createdBy;
}
