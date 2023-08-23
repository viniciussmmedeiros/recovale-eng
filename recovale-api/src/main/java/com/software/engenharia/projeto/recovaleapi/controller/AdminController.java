package com.software.engenharia.projeto.recovaleapi.controller;

import com.software.engenharia.projeto.recovaleapi.controller.request.AdminUpdateRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.UpdateCreatedAccountRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.LoginResponse;
import com.software.engenharia.projeto.recovaleapi.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService service;

    @PutMapping("/{adminId}/update")
    public void updateProfile(@PathVariable Long adminId, @RequestBody AdminUpdateRequest request) {
        service.updateProfile(adminId, request);
    }

    @GetMapping("/{adminId}/created-accounts")
    public List<LoginResponse> getCreatedAccounts(@PathVariable Long adminId) {
        return service.getCreatedAccounts(adminId);
    }

    @PutMapping("/update-created-account/{accountId}")
    public void updateCreatedAccount(@PathVariable Long accountId, @RequestBody UpdateCreatedAccountRequest request) {
        service.updateCreatedAccount(accountId, request);
    }

    @PutMapping("/delete-created-account/{accountId}")
    public void deleteCreatedAccount(@PathVariable Long accountId) {
        service.deleteCreatedAccount(accountId);
    }

    @PutMapping("/{accountId}/delete-account")
    public void deleteAccount(@PathVariable Long accountId) {
        service.deleteAccount(accountId);
    }
}
