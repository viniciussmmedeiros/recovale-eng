package com.software.engenharia.projeto.recovaleapi.service;

import com.software.engenharia.projeto.recovaleapi.controller.response.UserSenderPointsResponse;
import com.software.engenharia.projeto.recovaleapi.model.User;
import com.software.engenharia.projeto.recovaleapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserSenderService {
    @Autowired
    private UserRepository userRepository;

    public UserSenderPointsResponse getPoints(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado."));

        UserSenderPointsResponse response = new UserSenderPointsResponse();

        response.setCurrentPoints(user.getCurrentPoints());
        response.setTotalPoints(user.getTotalPoints());

        return response;
    }
}
