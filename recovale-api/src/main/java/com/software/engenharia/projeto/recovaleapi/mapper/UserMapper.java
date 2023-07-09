package com.software.engenharia.projeto.recovaleapi.mapper;

import com.software.engenharia.projeto.recovaleapi.controller.request.UserRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.LoginResponse;
import com.software.engenharia.projeto.recovaleapi.enums.AccountType;
import com.software.engenharia.projeto.recovaleapi.model.User;

public class UserMapper {
    public static LoginResponse toResponse(User entity){
        LoginResponse response = new LoginResponse();

        response.setId(entity.getId());
        response.setType(AccountType.USER);
        response.setUsername(entity.getUsername());
        response.setEmail(entity.getEmail());
        response.setCpf(entity.getCpf());

        return response;
    }

    public static User toEntity(UserRegistrationRequest request){
        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setCpf(request.getCpf());
        user.setPassword(request.getPassword());

        return user;
    }
}