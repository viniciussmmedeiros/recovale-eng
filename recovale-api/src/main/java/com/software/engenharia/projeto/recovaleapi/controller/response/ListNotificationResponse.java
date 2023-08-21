package com.software.engenharia.projeto.recovaleapi.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListNotificationResponse {
    private Long id;
    private Long requestId;
    private Long recipientId;
}
