package com.software.engenharia.projeto.recovaleapi.service;

import com.software.engenharia.projeto.recovaleapi.controller.request.AdminUpdateRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.UpdateCreatedAccountRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.LoginResponse;
import com.software.engenharia.projeto.recovaleapi.mapper.EmployeeMapper;
import com.software.engenharia.projeto.recovaleapi.model.Employee;
import com.software.engenharia.projeto.recovaleapi.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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

    public List<LoginResponse> getCreatedAccounts(Long adminId) {
        return employeeRepository.findAllByCreator(adminId)
                .stream()
                .map(EmployeeMapper::toResponse)
                .collect(Collectors.toList());
    }

    public void updateCreatedAccount(Long accountId, UpdateCreatedAccountRequest request) {
        Employee account = employeeRepository.findById(accountId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Conta não encontrada."));

        account.setUsername(request.getUsername());
        account.setPassword(request.getPassword());

        employeeRepository.save(account);
    }

    public void deleteCreatedAccount(Long accountId) {
        Employee account = employeeRepository.findById(accountId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Conta não encontrada."));

        account.setDeleted(true);

        employeeRepository.save(account);
    }

    public void deleteAccount(Long accountId) {
        Employee account = employeeRepository.findById(accountId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Conta não encontrada."));

        account.setDeleted(true);

        employeeRepository.save(account);
    }
}
