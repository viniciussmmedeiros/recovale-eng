package com.software.engenharia.projeto.recovaleapi.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListRewardsResponse {
    private Long id;
    private String title;
    private String description;
    private int points;
    private int quantityAvailable;
}
