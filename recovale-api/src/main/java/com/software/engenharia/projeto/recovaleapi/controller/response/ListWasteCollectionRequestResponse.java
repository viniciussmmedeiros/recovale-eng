package com.software.engenharia.projeto.recovaleapi.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;

@Getter
@Setter
public class ListWasteCollectionRequestResponse {
    private Long id;
    private Long collectionPointId;
    private Long senderId;
    private String recipientName;
    private String status;
    private Date requestDate;
    private String pointName;
    private BigDecimal longitude;
    private BigDecimal latitude;
    private int capacity;
    private int currentCapacity;
}
