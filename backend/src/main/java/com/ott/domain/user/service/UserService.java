package com.ott.domain.user.service;

import com.ott.domain.common.enums.UserStatus;
import com.ott.domain.user.dto.UserDto;
import com.ott.domain.user.entity.User;
import com.ott.domain.user.repository.UserRepository;
import com.ott.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    
    @Cacheable(value = "users", key = "#id")
    public UserDto findById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return mapToDto(user);
    }
    
    public UserDto findByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        return mapToDto(user);
    }
    
    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return mapToDto(user);
    }
    
    @CacheEvict(value = "users", key = "#id")
    public UserDto updateUserStatus(UUID id, UserStatus status) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setStatus(status);
        user.setLastSeen(LocalDateTime.now());
        return mapToDto(userRepository.save(user));
    }
    
    @CacheEvict(value = "users", key = "#id")
    public UserDto updateProfile(UUID id, String phoneNumber, String avatarUrl) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        if (phoneNumber != null) {
            user.setPhoneNumber(phoneNumber);
        }
        if (avatarUrl != null) {
            user.setAvatarUrl(avatarUrl);
        }
        return mapToDto(userRepository.save(user));
    }
    
    public List<UserDto> findAll() {
        return userRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .avatarUrl(user.getAvatarUrl())
                .status(user.getStatus())
                .createdAt(user.getCreatedAt())
                .lastSeen(user.getLastSeen())
                .build();
    }
}
