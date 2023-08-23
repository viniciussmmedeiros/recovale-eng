package com.software.engenharia.projeto.recovaleapi.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ListNotificationResponse {
    private Long id;
    private Long requestId;
    private Long recipientId;
    private String name;
    private int capacity;
    private int currentCapacity;
    private BigDecimal longitude;
    private BigDecimal latitude;
}
