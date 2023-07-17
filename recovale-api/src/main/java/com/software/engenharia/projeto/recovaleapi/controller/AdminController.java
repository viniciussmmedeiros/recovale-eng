package com.software.engenharia.projeto.recovaleapi.controller;

import com.software.engenharia.projeto.recovaleapi.controller.request.AdminUpdateRequest;
import com.software.engenharia.projeto.recovaleapi.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService service;

    @PutMapping("/{adminId}/update")
    public void updateProfile(@PathVariable Long adminId, @RequestBody AdminUpdateRequest request) {
        service.updateProfile(adminId, request);
    }
}
