package com.zola.domain.user.service;

import com.zola.domain.common.enums.UserRole;
import com.zola.domain.common.enums.UserStatus;
import com.zola.domain.user.dto.LoginRequest;
import com.zola.domain.user.dto.LoginResponse;
import com.zola.domain.user.dto.RegisterRequest;
import com.zola.domain.user.dto.UserDto;
import com.zola.domain.user.entity.User;
import com.zola.domain.user.repository.UserRepository;
import com.zola.exception.UnauthorizedException;
import com.zola.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public UserDto register(RegisterRequest request) {
        log.info("Registering new user: {}", request.getUsername());
        
        // Check if username exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Check if email exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setStatus(UserStatus.OFFLINE);
        user.setRole(UserRole.USER);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);
        log.info("User registered successfully: {}", savedUser.getUsername());
        
        return mapToDto(savedUser);
    }

    public LoginResponse login(LoginRequest request) {
        log.info("User attempting to login: {}", request.getUsernameOrEmail());
        
        // Find user by username or email
        User user = userRepository.findByUsername(request.getUsernameOrEmail())
                .orElseGet(() -> userRepository.findByEmail(request.getUsernameOrEmail())
                        .orElseThrow(() -> new UnauthorizedException("Invalid username/email or password")));

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid username/email or password");
        }

        // Update user status to ONLINE
        user.setStatus(UserStatus.ONLINE);
        user.setLastSeen(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user.getId().toString(), user.getUsername());

        log.info("User logged in successfully: {}", user.getUsername());
        
        return new LoginResponse(token, mapToDto(user));
    }

    public void logout(String token) {
        try {
            String userId = jwtTokenProvider.getUserIdFromToken(token);
            UUID uuid = UUID.fromString(userId);
            
            User user = userRepository.findById(uuid).orElse(null);
            if (user != null) {
                user.setStatus(UserStatus.OFFLINE);
                user.setLastSeen(LocalDateTime.now());
                user.setUpdatedAt(LocalDateTime.now());
                userRepository.save(user);
                log.info("User logged out: {}", user.getUsername());
            }
        } catch (Exception e) {
            log.error("Error during logout: {}", e.getMessage());
        }
    }

    public UserDto getCurrentUser(String token) {
        String userId = jwtTokenProvider.getUserIdFromToken(token);
        UUID uuid = UUID.fromString(userId);
        
        User user = userRepository.findById(uuid)
                .orElseThrow(() -> new UnauthorizedException("User not found"));
        
        return mapToDto(user);
    }

    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .avatarUrl(user.getAvatarUrl())
                .status(user.getStatus())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .lastSeen(user.getLastSeen())
                .build();
    }
}
