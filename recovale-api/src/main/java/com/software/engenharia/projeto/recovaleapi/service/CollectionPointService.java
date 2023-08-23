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
import com.software.engenharia.projeto.recovaleapi.model.CollectionPoint;
import com.software.engenharia.projeto.recovaleapi.model.User;
import com.software.engenharia.projeto.recovaleapi.model.WasteCollectionRequest;
import com.software.engenharia.projeto.recovaleapi.model.WasteCollectionRequestRecipient;
import com.software.engenharia.projeto.recovaleapi.repository.CollectionPointRepository;
import com.software.engenharia.projeto.recovaleapi.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    public List<ListCollectionPointResponse> listCollectionPoints() {
        return collectionPointRepository.findAll()
                .stream()
                .filter(collectionPoint -> !collectionPoint.isDeleted() && (collectionPoint.isApproved() || (collectionPoint.getSenderId() == null && !collectionPoint.isDeleted())))
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
        WasteCollectionRequest existingRequest = wasteCollectionRequestRepository.findExistingRequest(pointId, accountId);

        if(existingRequest != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você já solicitou uma coleta para este ponto!");
        }

        WasteCollectionRequest entity = WasteCollectionRequestMapper.toEntity(pointId, accountId);

        wasteCollectionRequestRepository.save(entity);
    }

    public List<ListWasteCollectionRequestResponse> listWasteCollectionRequests() {
        List<WasteCollectionRequest> requests = wasteCollectionRequestRepository.findAll()
                .stream()
                .filter(request -> request.getStatus().equals("REQUESTED"))
                .collect(Collectors.toList());

        List<ListWasteCollectionRequestResponse> responseList = new ArrayList<>();

        for (WasteCollectionRequest request : requests) {
            Long collectionPointId = request.getCollectionPointId();
            CollectionPoint collectionPoint = collectionPointRepository.findById(collectionPointId).orElse(null);

            if (collectionPoint != null) {
                ListWasteCollectionRequestResponse response = new ListWasteCollectionRequestResponse();

                response.setId(request.getId());
                response.setCollectionPointId(request.getCollectionPointId());
                response.setSenderId(request.getSenderId());
                response.setStatus(request.getStatus());
                response.setRequestDate(request.getRequestDate());
                response.setPointName(collectionPoint.getName());
                response.setLongitude(collectionPoint.getLongitude());
                response.setLatitude(collectionPoint.getLatitude());
                response.setCapacity(collectionPoint.getCapacity());
                response.setCurrentCapacity(collectionPoint.getCurrentCapacity());

                responseList.add(response);
            }
        }

        return responseList;
    }

    public void sendNotification(Long requestId, List<Long> recipientsIds) {
        WasteCollectionRequest request = wasteCollectionRequestRepository.findByRequestId(requestId);

        request.setStatus("DONE");

        wasteCollectionRequestRepository.save(request);

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
        List<WasteCollectionRequestRecipient> notifications = wasteCollectionRequestRecipientRepository.findAllByRecipientId(accountId)
                .stream()
                .filter(notification -> !notification.isDeleted())
                .collect(Collectors.toList());

        List<ListNotificationResponse> responseList = new ArrayList<>();

        for (WasteCollectionRequestRecipient notification : notifications) {
            Long requestId = notification.getRequestId();
            WasteCollectionRequest wasteRequest = wasteCollectionRequestRepository.findById(requestId).orElse(null);

            if (wasteRequest != null) {
                Long collectionPointId = wasteRequest.getCollectionPointId();
                CollectionPoint collectionPoint = collectionPointRepository.findById(collectionPointId).orElse(null);

                if (collectionPoint != null) {
                    ListNotificationResponse response = new ListNotificationResponse();

                    response.setId(notification.getId());
                    response.setRequestId(notification.getRequestId());
                    response.setRecipientId(notification.getRecipientId());
                    response.setName(collectionPoint.getName());
                    response.setCapacity(collectionPoint.getCapacity());
                    response.setCurrentCapacity(collectionPoint.getCurrentCapacity());
                    response.setLongitude(collectionPoint.getLongitude());
                    response.setLatitude(collectionPoint.getLatitude());

                    responseList.add(response);
                }
            }
        }

        return responseList;
    }

    @Transactional
    public void scheduleCollection(Long notificationId, Long recipientId, Long requestId) {
        WasteCollectionRequest collectionRequest = wasteCollectionRequestRepository.findByRequestId(requestId);

        collectionRequest.setStatus("SCHEDULED");
        collectionRequest.setRecipientId(recipientId);

        wasteCollectionRequestRepository.save(collectionRequest);

        wasteCollectionRequestRecipientRepository.deleteNotifications(requestId);
    }

    public List<ListWasteCollectionRequestResponse> listPendingCollections() {
        List<WasteCollectionRequest> pendingRequests = wasteCollectionRequestRepository.findAllScheduled()
                .stream()
                .collect(Collectors.toList());

        List<ListWasteCollectionRequestResponse> responseList = new ArrayList<>();

        for (WasteCollectionRequest collectionRequest : pendingRequests) {
            Long recipientId = collectionRequest.getRecipientId();
            Long collectionPointId = collectionRequest.getCollectionPointId();
            User recipient = userRepository.findById(recipientId).orElse(null);
            CollectionPoint collectionPoint = collectionPointRepository.findById(collectionPointId).orElse(null);

            if (recipient != null && collectionPoint != null) {
                ListWasteCollectionRequestResponse response = new ListWasteCollectionRequestResponse();

                response.setId(collectionRequest.getId());
                response.setCollectionPointId(collectionRequest.getCollectionPointId());
                response.setSenderId(collectionRequest.getSenderId());
                response.setStatus(collectionRequest.getStatus());
                response.setRequestDate(collectionRequest.getRequestDate());
                response.setRecipientName(recipient.getUsername());
                response.setPointName(collectionPoint.getName());
                response.setLatitude(collectionPoint.getLatitude());
                response.setLongitude(collectionPoint.getLongitude());

                responseList.add(response);
            }
        }

        return responseList;
    }

    public void validateCollection(Long collectionPointId, Long requestId) {
        WasteCollectionRequest collectionRequest = wasteCollectionRequestRepository.findByRequestId(requestId);

        collectionRequest.setStatus("COLLECTED");

        CollectionPoint collectionPoint = collectionPointRepository.findById(collectionPointId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ponto de coleta informado não existe."));

        collectionPoint.setCurrentCapacity(0);

        wasteCollectionRequestRepository.save(collectionRequest);
        collectionPointRepository.save(collectionPoint);
    }

    public void discard(Long collectionPointId, Long userId, int quantity) {
        CollectionPoint collectionPoint = collectionPointRepository.findById(collectionPointId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        if(user != null && collectionPoint != null) {
            if(collectionPoint.getCurrentCapacity() + quantity > collectionPoint.getCapacity()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não há espaço suficiente no ponto de coleta.");
            }
            collectionPoint.setCurrentCapacity(collectionPoint.getCurrentCapacity() + quantity);
            user.setCurrentPoints(user.getCurrentPoints() + quantity);

            collectionPointRepository.save(collectionPoint);
            userRepository.save(user);
        }else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ocorre um erro");
        }
    }
}
