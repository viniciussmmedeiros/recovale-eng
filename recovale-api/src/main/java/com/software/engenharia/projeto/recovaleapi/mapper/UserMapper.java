package com.software.engenharia.projeto.recovaleapi.mapper;

import com.software.engenharia.projeto.recovaleapi.controller.request.UserRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.LoginResponse;
import com.software.engenharia.projeto.recovaleapi.enums.UserType;
import com.software.engenharia.projeto.recovaleapi.model.User;

public class UserMapper {
    public static LoginResponse toResponse(User entity){
        LoginResponse response = new LoginResponse();

        response.setId(entity.getId());
        response.setType(entity.getType().toString());
        response.setUsername(entity.getUsername());
        response.setEmail(entity.getEmail());
        response.setCpf(entity.getCpf());
        response.setPassword(entity.getPassword());

        return response;
    }

    public static User toEntity(UserRegistrationRequest request){
        User user = new User();

        if(request.getCpf().length() == 14) {
            user.setType(UserType.RECIPIENT);
        } else {
            user.setType(UserType.SENDER);
        }
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setCpf(request.getCpf());
        user.setPassword(request.getPassword());

        return user;
    }
}