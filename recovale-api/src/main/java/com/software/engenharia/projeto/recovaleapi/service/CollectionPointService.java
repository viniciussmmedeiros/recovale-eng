package com.software.engenharia.projeto.recovaleapi.service;

import com.software.engenharia.projeto.recovaleapi.controller.request.ApproveCollectionPointRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.CollectionPointRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.CollectionPointRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListCollectionPointRequestResponse;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListCollectionPointResponse;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListNotificationResponse;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListWasteCollectionRequestResponse;
import com.software.engenharia.projeto.recovaleapi.mapper.CollectionPointMapper;
import com.software.engenharia.projeto.recovaleapi.mapper.WasteCollectionRequestMapper;
import com.software.engenharia.projeto.recovaleapi.mapper.WasteCollectionRequestRecipientMapper;
import com.software.engenharia.projeto.recovaleapi.model.CollectionPoint;
import com.software.engenharia.projeto.recovaleapi.model.WasteCollectionRequest;
import com.software.engenharia.projeto.recovaleapi.model.WasteCollectionRequestRecipient;
import com.software.engenharia.projeto.recovaleapi.repository.CollectionPointRepository;
import com.software.engenharia.projeto.recovaleapi.repository.WasteCollectionRequestRecipientRepository;
import com.software.engenharia.projeto.recovaleapi.repository.WasteCollectionRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollectionPointService {
    @Autowired
    private CollectionPointRepository collectionPointRepository;

    @Autowired
    private WasteCollectionRequestRepository wasteCollectionRequestRepository;

    @Autowired
    private WasteCollectionRequestRecipientRepository wasteCollectionRequestRecipientRepository;

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

    public void requestWasteCollection(Long pointId, Long accountId) {
        WasteCollectionRequest entity = WasteCollectionRequestMapper.toEntity(pointId, accountId);

        wasteCollectionRequestRepository.save(entity);
    }

    public List<ListWasteCollectionRequestResponse> listWasteCollectionRequests() {
        return wasteCollectionRequestRepository.findAll()
                .stream()
                //.filter(collectionPoint -> collectionPoint.isApproved() || (collectionPoint.getSenderId() == null && !collectionPoint.isDeleted()))
                //.filter(collectionPoint -> collectionPoint.isApproved() || (!collectionPoint.isDeleted()))
                .map(x -> WasteCollectionRequestMapper.toResponse(x))
                .collect(Collectors.toList());
    }

    public void sendNotification(Long requestId, List<Long> recipientsIds) {
        List<WasteCollectionRequestRecipient> recipients = new ArrayList<>();

        for (Long recipientId : recipientsIds) {
            WasteCollectionRequestRecipient recipient = new WasteCollectionRequestRecipient();
            recipient.setRequestId(requestId);
            recipient.setRecipientId(recipientId);
            recipients.add(recipient);
        }

        wasteCollectionRequestRecipientRepository.saveAll(recipients);
    }

    public List<ListNotificationResponse> listNotifications(Long accountId) {
        return wasteCollectionRequestRecipientRepository.findAllByRecipientId(accountId)
                .stream()
                .map(x -> WasteCollectionRequestRecipientMapper.toResponse(x))
                .collect(Collectors.toList());
    }

    @Transactional
    public void scheduleCollection(Long notificationId, Long recipientId, Long requestId) {
        WasteCollectionRequest collectionRequest = wasteCollectionRequestRepository.findByRequestId(requestId);

        collectionRequest.setStatus("SCHEDULED");

        wasteCollectionRequestRepository.save(collectionRequest);

        wasteCollectionRequestRecipientRepository.deleteNotifications(requestId);
    }

    public List<ListWasteCollectionRequestResponse> listPendingCollections() {
        return wasteCollectionRequestRepository.findAllScheduled()
                .stream()
                .map(x -> WasteCollectionRequestMapper.toResponse(x))
                .collect(Collectors.toList());
    }

    public void validateCollection(Long collectionPointId, Long requestId) {
        WasteCollectionRequest collectionRequest = wasteCollectionRequestRepository.findByRequestId(requestId);

        collectionRequest.setStatus("COLLECTED");

        CollectionPoint collectionPoint = collectionPointRepository.findById(collectionPointId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ponto de coleta informado não existe."));

        collectionPoint.setCurrentCapacity(0);

        wasteCollectionRequestRepository.save(collectionRequest);
        collectionPointRepository.save(collectionPoint);
    }
}
