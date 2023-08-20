package com.software.engenharia.projeto.recovaleapi.service;

import com.software.engenharia.projeto.recovaleapi.controller.request.ApproveCollectionPointRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.CollectionPointRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.CollectionPointRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListCollectionPointRequestResponse;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListCollectionPointResponse;
import com.software.engenharia.projeto.recovaleapi.mapper.CollectionPointMapper;
import com.software.engenharia.projeto.recovaleapi.model.CollectionPoint;
import com.software.engenharia.projeto.recovaleapi.repository.CollectionPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollectionPointService {
    @Autowired
    private CollectionPointRepository collectionPointRepository;

    public List<ListCollectionPointResponse> listCollectionPoints() {
        return collectionPointRepository.findAll()
                .stream()
                .filter(collectionPoint -> collectionPoint.isApproved() || (collectionPoint.getSenderId() == null && !collectionPoint.isDeleted()))
                //.filter(collectionPoint -> collectionPoint.isApproved() || (!collectionPoint.isDeleted()))
                .map(x -> CollectionPointMapper.toResponse(x))
                .collect(Collectors.toList());
    }

    public List<ListCollectionPointRequestResponse> listCollectionPointsRequest() {
        return collectionPointRepository.findAllPendingRequests()
                .stream()
                .filter(collectionPoint -> collectionPoint.getSenderId() != null && !collectionPoint.isApproved() && !collectionPoint.isDeleted())
                .map(x -> CollectionPointMapper.toResponseRequest(x))
                .collect(Collectors.toList());
    }

    public void requestCollectionPoint(CollectionPointRequest request) {
        CollectionPoint collectionPoint = CollectionPointMapper.requestToEntity(request);

        collectionPointRepository.save(collectionPoint);
    }

    public void registerCollectionPoint(CollectionPointRegistrationRequest request) {
        CollectionPoint collectionPoint = CollectionPointMapper.registrationToEntity(request);

        collectionPointRepository.save(collectionPoint);
    }

    public void approveRequest(ApproveCollectionPointRequest request) {
        CollectionPoint entity = collectionPointRepository.findById(request.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ponto de coleta não encontrado."));

        entity.setName(request.getName());
        entity.setCapacity(request.getCapacity());
        entity.setApproved(true);

        collectionPointRepository.save(entity);
    }

    public void refuseRequest(Long id) {
        CollectionPoint entity = collectionPointRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ponto de coleta não encontrado."));

        entity.setDeleted(true);
        entity.setApproved(false);

        collectionPointRepository.save(entity);
    }

    public void deletePoint(Long id) {
        CollectionPoint entity = collectionPointRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ponto de coleta não encontrado."));

        entity.setDeleted(true);

        collectionPointRepository.save(entity);
    }
}
