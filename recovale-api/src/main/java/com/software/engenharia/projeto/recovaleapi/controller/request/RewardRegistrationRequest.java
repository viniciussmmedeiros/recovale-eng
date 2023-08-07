package com.software.engenharia.projeto.recovaleapi.controller.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RewardRegistrationRequest {
    private String title;
    private String description;
    private int points;
    private int quantityAvailable;
}
