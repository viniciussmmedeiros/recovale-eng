package com.software.engenharia.projeto.recovaleapi.controller;

import com.software.engenharia.projeto.recovaleapi.controller.request.EmployeeRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.LoginRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.UserRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.LoginResponse;
import com.software.engenharia.projeto.recovaleapi.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/auth")
public class SecurityController {
    @Autowired
    private AuthService service;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return service.getLoginResponse(request);
    }

    @PostMapping("/register/employee")
    public void registerEmployee(@Valid @RequestBody EmployeeRegistrationRequest request) {
        service.registerEmployee(request);
    }

    @PostMapping("/register/user")
    public LoginResponse registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        return service.registerUser(request);
    }
}
