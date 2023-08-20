package com.software.engenharia.projeto.recovaleapi.controller.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CollectionPointRegistrationRequest {
    private BigDecimal longitude;
    private BigDecimal latitude;
    private String name;
    private int capacity;
}
