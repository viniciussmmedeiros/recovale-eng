package com.software.engenharia.projeto.recovaleapi.service;

import com.software.engenharia.projeto.recovaleapi.controller.request.EmployeeRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.LoginRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.UserRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.LoginResponse;
import com.software.engenharia.projeto.recovaleapi.mapper.EmployeeMapper;
import com.software.engenharia.projeto.recovaleapi.mapper.UserMapper;
import com.software.engenharia.projeto.recovaleapi.model.Employee;
import com.software.engenharia.projeto.recovaleapi.model.User;
import com.software.engenharia.projeto.recovaleapi.repository.EmployeeRepository;
import com.software.engenharia.projeto.recovaleapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static java.util.Objects.nonNull;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public User getUser(LoginRequest request){
        return userRepository.findByUsernameAndPassword(request.getUsername(), request.getPassword());
    }

    public Employee getEmployee(LoginRequest request){
        return employeeRepository.findByUsernameAndPassword(request.getUsername(), request.getPassword());
    }

    public LoginResponse getLoginResponse(LoginRequest request) {
        User userEntity = getUser(request);
        Employee employeeEntity = getEmployee(request);

        if(nonNull(userEntity)) {
            if(userEntity.isDeleted()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado.");
            }
            return UserMapper.toResponse(userEntity);
        } else if(nonNull(employeeEntity)){
            if(employeeEntity.isDeleted()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Funcionário não encontrado.");
            }
            return EmployeeMapper.toResponse(employeeEntity);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado.");
    }

    public LoginResponse registerUser(UserRegistrationRequest request) {
        User user = UserMapper.toEntity(request);

        boolean existingUserCpfCnpj = userRepository.findByCpfCnpj(request.getCpf());

        if(existingUserCpfCnpj) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CPF / CNPJ já cadastrado.");
        }

        userRepository.save(user);

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(request.getUsername());
        loginRequest.setPassword(request.getPassword());

        return getLoginResponse(loginRequest);
    }

    public void registerEmployee(EmployeeRegistrationRequest request) {
        boolean isUsernameAlreadyInUse = employeeRepository.findByUsername(request.getUsername());

        if(isUsernameAlreadyInUse) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username já está em uso.");
        }

        Employee employee = EmployeeMapper.toEntity(request);

        employeeRepository.save(employee);
    }
}
