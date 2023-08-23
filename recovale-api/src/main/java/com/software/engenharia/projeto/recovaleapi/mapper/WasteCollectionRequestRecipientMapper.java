package com.software.engenharia.projeto.recovaleapi.mapper;

import com.software.engenharia.projeto.recovaleapi.controller.response.ListNotificationResponse;
import com.software.engenharia.projeto.recovaleapi.model.WasteCollectionRequestRecipient;

public class WasteCollectionRequestRecipientMapper {

    public static ListNotificationResponse toResponse(WasteCollectionRequestRecipient entity) {
        ListNotificationResponse response = new ListNotificationResponse();

        response.setId(entity.getId());
        response.setRequestId(entity.getRequestId());
        response.setRecipientId(entity.getRecipientId());

        return response;
    }
}
