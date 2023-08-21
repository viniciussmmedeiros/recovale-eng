package com.software.engenharia.projeto.recovaleapi.mapper;

import com.software.engenharia.projeto.recovaleapi.controller.response.ListWasteCollectionRequestResponse;
import com.software.engenharia.projeto.recovaleapi.model.WasteCollectionRequest;

import java.util.List;

public class WasteCollectionRequestMapper {
    public static WasteCollectionRequest toEntity(Long pointId, Long accountId) {
        WasteCollectionRequest entity = new WasteCollectionRequest();

        entity.setCollectionPointId(pointId);
        entity.setSenderId(accountId);
        entity.setStatus("REQUESTED");

        return entity;
    }

    public static ListWasteCollectionRequestResponse toResponse(WasteCollectionRequest entity) {
        ListWasteCollectionRequestResponse response = new ListWasteCollectionRequestResponse();

        response.setId(entity.getId());
        response.setCollectionPointId(entity.getCollectionPointId());
        response.setSenderId(entity.getSenderId());
        response.setStatus(entity.getStatus());
        response.setRequestDate(entity.getRequestDate());

        return response;
    }
}
