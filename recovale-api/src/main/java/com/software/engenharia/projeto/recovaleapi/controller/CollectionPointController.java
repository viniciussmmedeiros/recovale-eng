package com.software.engenharia.projeto.recovaleapi.controller;

import com.software.engenharia.projeto.recovaleapi.controller.request.ApproveCollectionPointRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.CollectionPointRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.CollectionPointRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListCollectionPointRequestResponse;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListCollectionPointResponse;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListNotificationResponse;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListWasteCollectionRequestResponse;
import com.software.engenharia.projeto.recovaleapi.service.CollectionPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/collection-point")
public class CollectionPointController {
    @Autowired
    private CollectionPointService service;

    @GetMapping("/list")
    public List<ListCollectionPointResponse> listCollectionPoints() {
        return service.listCollectionPoints();
    }

    @GetMapping("/list-requests")
    public List<ListCollectionPointRequestResponse> listRequests() {
        return service.listCollectionPointsRequest();
    }

    @PostMapping("/request")
    public void requestCollectionPoint(@RequestBody CollectionPointRequest request) {
        service.requestCollectionPoint(request);
    }

    @PostMapping("/register")
    public void requestCollectionPoint(@RequestBody CollectionPointRegistrationRequest request) {
        service.registerCollectionPoint(request);
    }

    @PutMapping("/approve-request")
    public void approveRequest(@RequestBody ApproveCollectionPointRequest request){
        service.approveRequest(request);
    }

    @PutMapping("/refuse-request/{id}")
    public void approveRequest(@PathVariable Long id){
        service.refuseRequest(id);
    }

    @PutMapping("/delete/{id}")
    public void deletePoint(@PathVariable Long id){
        service.deletePoint(id);
    }

    @PostMapping("/{pointId}/request-collection/{accountId}")
    public void requestWasteCollection(@PathVariable Long pointId, @PathVariable Long accountId) {
        service.requestWasteCollection(pointId, accountId);
    }

    @GetMapping("/list-waste-collection-requests")
    public List<ListWasteCollectionRequestResponse> listWasteCollectionRequests() {
        return service.listWasteCollectionRequests();
    }

    @PostMapping("/request/send-notification/{requestId}")
    public void sendNotification(@RequestBody List<Long> recipientsIds, @PathVariable Long requestId) {
        service.sendNotification(requestId, recipientsIds);
    }

    @GetMapping("/request/list-notifications/{accountId}")
    public List<ListNotificationResponse> listNotifications(@PathVariable Long accountId) {
        return service.listNotifications(accountId);
    }

    @PutMapping("/request/schedule-collection/{notificationId}/{recipientId}/{requestId}")
    public void scheduleCollection(@PathVariable Long notificationId, @PathVariable Long recipientId, @PathVariable Long requestId) {
        service.scheduleCollection(notificationId, recipientId, requestId);
    }

    @GetMapping("/list-pending-collections")
    public List<ListWasteCollectionRequestResponse> listPendingCollections() {
        return service.listPendingCollections();
    }

    @PutMapping("/{collectionPointId}/validate-collection/{requestId}")
    public void validateCollection(@PathVariable Long collectionPointId, @PathVariable Long requestId) {
        service.validateCollection(collectionPointId, requestId);
    }
}
