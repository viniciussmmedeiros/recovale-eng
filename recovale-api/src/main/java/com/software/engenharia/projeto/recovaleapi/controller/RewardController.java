package com.software.engenharia.projeto.recovaleapi.controller;

import com.software.engenharia.projeto.recovaleapi.controller.request.RewardRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.RewardUpdateRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListRewardsResponse;
import com.software.engenharia.projeto.recovaleapi.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reward")
public class RewardController {
    @Autowired
    private RewardService service;

    @GetMapping("/list")
    public List<ListRewardsResponse> listRewards(@RequestParam(required = false) Integer pointsFilter) {
        return service.listRewards(pointsFilter);
    }

    @PostMapping("/{rewardId}/claim/{userId}")
    public void claimReward(@PathVariable Long rewardId, @PathVariable Long userId) {
        service.claimReward(rewardId, userId);
    }

    @PostMapping("/register")
    public void register(@RequestBody RewardRegistrationRequest request) {
        service.register(request);
    }

    @PutMapping("/{rewardId}/update")
    public void update(@PathVariable Long rewardId, @RequestBody RewardUpdateRequest request) {
        service.update(rewardId, request);
    }

    @PutMapping("/{rewardId}/delete")
    public void delete(@PathVariable Long rewardId) {
        service.delete(rewardId);
    }
}
