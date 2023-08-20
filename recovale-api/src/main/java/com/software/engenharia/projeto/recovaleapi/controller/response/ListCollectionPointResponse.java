package com.software.engenharia.projeto.recovaleapi.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ListCollectionPointResponse {
    private Long id;
    private String name;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private int capacity;
    private int currentCapacity;
}
