package com.software.engenharia.projeto.recovaleapi.mapper;

import com.software.engenharia.projeto.recovaleapi.controller.response.ListRankingResponse;
import com.software.engenharia.projeto.recovaleapi.model.User;

public class RankingMapper {
    public static ListRankingResponse toResponse(User entity) {
        ListRankingResponse response = new ListRankingResponse();

        response.setId(entity.getId());
        response.setUsername(entity.getUsername());
        response.setCurrentPoints(entity.getCurrentPoints());
        response.setTotalPoints(entity.getTotalPoints());

        return response;
    }
}
