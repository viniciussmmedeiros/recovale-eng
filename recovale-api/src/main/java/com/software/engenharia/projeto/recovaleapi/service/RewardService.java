package com.software.engenharia.projeto.recovaleapi.service;

import com.software.engenharia.projeto.recovaleapi.controller.request.RewardRegistrationRequest;
import com.software.engenharia.projeto.recovaleapi.controller.request.RewardUpdateRequest;
import com.software.engenharia.projeto.recovaleapi.controller.response.ListRewardsResponse;
import com.software.engenharia.projeto.recovaleapi.mapper.RewardMapper;
import com.software.engenharia.projeto.recovaleapi.model.Reward;
import com.software.engenharia.projeto.recovaleapi.model.User;
import com.software.engenharia.projeto.recovaleapi.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RewardService {
    @Autowired
    private RewardRepository rewardRepository;

    @Autowired
    private HandleUserService handleUserService;

    public List<ListRewardsResponse> listRewards(Integer pointsFilter) {
        if(pointsFilter != null){
            return rewardRepository.listByFilter(pointsFilter)
                    .stream()
                    .map(RewardMapper::toResponse)
                    .collect(Collectors.toList());
        }

        return rewardRepository.listAll()
                .stream()
                .map(RewardMapper::toResponse)
                .collect(Collectors.toList());
    }

    public void claimReward(Long rewardId, Long userId) {
        Reward reward = rewardRepository.findById(rewardId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Reward não encontrada."));

        User user = handleUserService.fetchById(userId);

        if(user.getCurrentPoints() < reward.getPoints()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você não tem pontos suficientes.");
        }

        if(reward.getQuantityAvailable() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Recompensa não disponível.");
        }

        reward.setQuantityAvailable(reward.getQuantityAvailable() - 1);
        user.setCurrentPoints(user.getCurrentPoints() - reward.getPoints());

        handleUserService.saveUser(user);
        rewardRepository.save(reward);
    }

    public void register(RewardRegistrationRequest request) {
        Reward reward = RewardMapper.toEntity(request);

        rewardRepository.save(reward);
    }

    public void update(Long rewardId, RewardUpdateRequest request) {
        Reward reward = rewardRepository.findById(rewardId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Recompensa não encontrada."));

        reward.setTitle(request.getTitle());
        reward.setDescription(request.getDescription());
        reward.setPoints(request.getPoints());
        reward.setQuantityAvailable(request.getQuantityAvailable());

        rewardRepository.save(reward);
    }

    public void delete(Long rewardId) {
        Reward entity = rewardRepository.findById(rewardId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Recompensa não encontrada."));

        entity.setDeleted(true);

        rewardRepository.save(entity);
    }
}
