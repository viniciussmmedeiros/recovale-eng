package com.software.engenharia.projeto.recovaleapi.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;

@Getter
@Setter
public class ListCollectionPointRequestResponse {
    private Long id;
    private BigDecimal longitude;
    private BigDecimal latitude;
    private Date requestDate;
    private Long senderId;
}
