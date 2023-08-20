package com.software.engenharia.projeto.recovaleapi.mapper;

import com.software.engenharia.projeto.recovaleapi.controller.request.CollectionPointRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.CollectionPointRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListCollectionPointRequestResponse;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListCollectionPointResponse;
import com.software.engenharia.projeto.recovaleapi.model.CollectionPoint;

public class CollectionPointMapper {
    public static ListCollectionPointResponse toResponse(CollectionPoint entity) {
        ListCollectionPointResponse response = new ListCollectionPointResponse();

        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setLatitude(entity.getLatitude());
        response.setLongitude(entity.getLongitude());
        response.setCapacity(entity.getCapacity());
        response.setCurrentCapacity(entity.getCurrentCapacity());

        return response;
    }

    public static ListCollectionPointRequestResponse toResponseRequest(CollectionPoint entity) {
        ListCollectionPointRequestResponse response = new ListCollectionPointRequestResponse();

        response.setId(entity.getId());
        response.setLatitude(entity.getLatitude());
        response.setLongitude(entity.getLongitude());
        response.setSenderId(entity.getSenderId());
        response.setRequestDate(entity.getRequestDate());

        return response;
    }

    public static CollectionPoint requestToEntity(CollectionPointRequest request) {
        CollectionPoint entity = new CollectionPoint();

        entity.setLatitude(request.getLatitude());
        entity.setLongitude(request.getLongitude());
        entity.setRequestDate(request.getRequestDate());
        entity.setSenderId(request.getSenderId());

        return entity;
    }

    public static CollectionPoint registrationToEntity(CollectionPointRegistrationRequest request) {
        CollectionPoint entity = new CollectionPoint();

        entity.setName(request.getName());
        entity.setCapacity(request.getCapacity());
        entity.setLatitude(request.getLatitude());
        entity.setLongitude(request.getLongitude());

        return entity;
    }
}
