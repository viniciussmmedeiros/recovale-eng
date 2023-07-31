package com.software.engenharia.projeto.recovaleapi.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListRankingResponse {
    private Long id;
    private String username;
    private int currentPoints;
    private int totalPoints;
}
