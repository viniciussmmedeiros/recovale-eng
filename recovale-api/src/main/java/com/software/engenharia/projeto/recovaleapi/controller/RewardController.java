package com.software.engenharia.projeto.recovaleapi.controller;

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
}
