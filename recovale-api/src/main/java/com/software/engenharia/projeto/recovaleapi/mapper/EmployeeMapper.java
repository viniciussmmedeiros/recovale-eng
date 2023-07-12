package com.software.engenharia.projeto.recovaleapi.mapper;

import com.software.engenharia.projeto.recovaleapi.controller.request.EmployeeRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.LoginResponse;
import com.software.engenharia.projeto.recovaleapi.model.Employee;

public class EmployeeMapper {
    public static LoginResponse toResponse(Employee entity){
        LoginResponse response = new LoginResponse();

        response.setId(entity.getId());
        response.setType(entity.getType().toString());
        response.setUsername(entity.getUsername());

        return response;
    }

    public static Employee toEntity(EmployeeRegistrationRequest request){
        Employee employee = new Employee();

        employee.setType(request.getType());
        employee.setUsername(request.getUsername());
        employee.setPassword(request.getPassword());

        return employee;
    }
}
