package com.software.engenharia.projeto.recovaleapi.controller;

import com.software.engenharia.projeto.recovaleapi.controller.request.ApproveCollectionPointRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.CollectionPointRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.CollectionPointRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListCollectionPointRequestResponse;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListCollectionPointResponse;
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
}
