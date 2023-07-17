package com.software.engenharia.projeto.recovaleapi.mapper;

import com.software.engenharia.projeto.recovaleapi.controller.response.ListRewardsResponse;
import com.software.engenharia.projeto.recovaleapi.model.Reward;

public class RewardMapper {
    public static ListRewardsResponse toResponse(Reward entity){
        ListRewardsResponse response = new ListRewardsResponse();

        response.setId(entity.getId());
        response.setTitle(entity.getTitle());
        response.setDescription(entity.getDescription());
        response.setQuantityAvailable(entity.getQuantityAvailable());
        response.setPoints(entity.getPoints());

        return response;
    }
}
