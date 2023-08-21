package com.software.engenharia.projeto.recovaleapi.controller;

import com.software.engenharia.projeto.recovaleapi.controller.request.UserUpdateRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListRankingResponse;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListRecipientResponse;
import com.software.engenharia.projeto.recovaleapi.controller.response.UserSenderPointsResponse;
import com.software.engenharia.projeto.recovaleapi.service.UserSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-sender")
public class UserSenderController {
    @Autowired
    private UserSenderService service;

    @GetMapping("/{userId}/points")
    public UserSenderPointsResponse getPoints(@PathVariable Long userId) {
        return service.getPoints(userId);
    }

    @PutMapping("/{userId}/update")
    public void updateProfile(@PathVariable Long userId, @RequestBody UserUpdateRequest request) {
        service.updateProfile(userId, request);
    }

    @GetMapping("/ranking/{filterBy}/{order}")
    public List<ListRankingResponse> getRanking(@PathVariable String filterBy, @PathVariable String order) {
        return service.getRanking(filterBy, order);
    }

    @PutMapping("/{accountId}/delete-account")
    public void deleteCreatedAccount(@PathVariable Long accountId) {
        service.deleteAccount(accountId);
    }

    @GetMapping("/list-recipients")
    public List<ListRecipientResponse> getRecipients() {
        return service.getRecipients();
    }
}
