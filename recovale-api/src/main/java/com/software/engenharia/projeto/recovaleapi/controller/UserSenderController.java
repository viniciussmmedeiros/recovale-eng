package com.software.engenharia.projeto.recovaleapi.controller;

import com.software.engenharia.projeto.recovaleapi.controller.response.UserSenderPointsResponse;
import com.software.engenharia.projeto.recovaleapi.service.UserSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user-sender")
public class UserSenderController {
    @Autowired
    private UserSenderService service;

    @GetMapping("/{userId}/points")
    public UserSenderPointsResponse getPoints(@PathVariable Long userId) {
        return service.getPoints(userId);
    }
}
