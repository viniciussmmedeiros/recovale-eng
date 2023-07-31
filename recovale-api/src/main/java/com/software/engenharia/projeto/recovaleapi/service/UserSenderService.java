package com.software.engenharia.projeto.recovaleapi.service;

import com.software.engenharia.projeto.recovaleapi.controller.request.UserUpdateRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListRankingResponse;
import com.software.engenharia.projeto.recovaleapi.controller.response.UserSenderPointsResponse;
import com.software.engenharia.projeto.recovaleapi.enums.UserType;
import com.software.engenharia.projeto.recovaleapi.mapper.RankingMapper;
import com.software.engenharia.projeto.recovaleapi.model.User;
import com.software.engenharia.projeto.recovaleapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UserSenderService {
    @Autowired
    private UserRepository userRepository;

    public UserSenderPointsResponse getPoints(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado."));

        UserSenderPointsResponse response = new UserSenderPointsResponse();

        response.setCurrentPoints(user.getCurrentPoints());
        response.setTotalPoints(user.getTotalPoints());

        return response;
    }

    public void updateProfile(Long userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado."));

        if(!Objects.equals(request.getUsername(), user.getUsername())) {
            boolean userSameUsername = userRepository.findByUsername(request.getUsername());

            if(userSameUsername) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username inválido");
            }

            user.setUsername(request.getUsername());
        }

        if(!Objects.equals(request.getEmail(), user.getEmail())) {
            boolean userSameEmail = userRepository.findByEmail(request.getEmail());

            if(userSameEmail) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "email inválido");
            }

            user.setEmail(request.getEmail());
        }

        if(!Objects.equals(request.getCpfCnpj(), user.getCpf())) {
            boolean userSameCpfCnpj = userRepository.findByCpfCnpj(request.getCpfCnpj());

            if(userSameCpfCnpj) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "cpf/cnpj inválido");
            }

            user.setCpf(request.getCpfCnpj());
        }

        user.setPassword(request.getPassword());

        userRepository.save(user);
    }

    public List<ListRankingResponse> getRanking(String filterBy, String order){
        return userRepository.findAll(Sort.by(Sort.Direction.fromString(order.toLowerCase()), filterBy))
                .stream()
                .filter(user -> UserType.SENDER.equals(user.getType()))
                .map(RankingMapper::toResponse)
                .collect(Collectors.toList());
    }
}
