package com.software.engenharia.projeto.recovaleapi.service;

import com.software.engenharia.projeto.recovaleapi.controller.request.AdminUpdateRequest;
import com.software.engenharia.projeto.recovaleapi.model.Employee;
import com.software.engenharia.projeto.recovaleapi.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@Service
public class AdminService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public void updateProfile(Long adminId, AdminUpdateRequest request) {
        Employee employee = employeeRepository.findById(adminId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Admin não encontrado."));

        if(!Objects.equals(request.getUsername(), employee.getUsername())) {
            boolean adminSameUsername = employeeRepository.findByUsername(request.getUsername());

            if(adminSameUsername) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username inválido");
            }

            employee.setUsername(request.getUsername());
        }

        employee.setPassword(request.getPassword());

        employeeRepository.save(employee);
    }
}
