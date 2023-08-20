package com.software.engenharia.projeto.recovaleapi.controller.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;

@Getter
@Setter
public class CollectionPointRequest {
    private BigDecimal longitude;
    private BigDecimal latitude;
    private Date requestDate;
    private Long senderId;
}
