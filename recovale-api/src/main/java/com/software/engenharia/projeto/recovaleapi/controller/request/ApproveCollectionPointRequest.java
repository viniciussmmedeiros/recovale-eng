package com.software.engenharia.projeto.recovaleapi.controller.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApproveCollectionPointRequest {
    private Long id;
    private String name;
    private int capacity;
}
