package com.zola.domain.user.service;

import com.zola.domain.common.enums.UserRole;
import com.zola.domain.common.enums.UserStatus;
import com.zola.domain.user.dto.*;
import com.zola.domain.user.entity.User;
import com.zola.domain.user.repository.UserRepository;
import com.zola.exception.UnauthorizedException;
import com.zola.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
    
    @Value("${auth.max-login-attempts:5}")
    private int maxLoginAttempts;
    
    @Value("${auth.lock-duration-minutes:30}")
    private int lockDurationMinutes;

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
        user.setEmailVerified(false);
        user.setLoginAttempts(0);
        
        // Generate email verification token
        String verificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(verificationToken);
        user.setVerificationTokenExpiry(LocalDateTime.now().plusHours(24));
        
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);
        log.info("User registered successfully: {}", savedUser.getUsername());
        
        // TODO: Send verification email with token
        
        return mapToDto(savedUser);
    }

    public LoginResponse login(LoginRequest request) {
        log.info("User attempting to login: {}", request.getUsernameOrEmail());
        
        // Find user by username or email
        User user = userRepository.findByUsername(request.getUsernameOrEmail())
                .orElseGet(() -> userRepository.findByEmail(request.getUsernameOrEmail())
                        .orElseThrow(() -> new UnauthorizedException("Invalid username/email or password")));

        // Check if account is locked
        if (user.isAccountLocked()) {
            throw new UnauthorizedException("Account is locked. Please try again later.");
        }

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            handleFailedLogin(user);
            throw new UnauthorizedException("Invalid username/email or password");
        }

        // Reset login attempts on successful login
        user.resetLoginAttempts();

        // Update user status to ONLINE
        user.setStatus(UserStatus.ONLINE);
        user.setLastSeen(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        
        // Generate JWT tokens
        String accessToken = jwtTokenProvider.generateToken(user.getId().toString(), user.getUsername());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId().toString(), user.getUsername());
        
        // Save refresh token
        user.setRefreshToken(refreshToken);
        user.setRefreshTokenExpiry(LocalDateTime.now().plusDays(30));
        
        userRepository.save(user);

        log.info("User logged in successfully: {}", user.getUsername());
        
        LoginResponse response = new LoginResponse(accessToken, mapToDto(user));
        return response;
    }
    
    private void handleFailedLogin(User user) {
        user.incrementLoginAttempts();
        
        if (user.getLoginAttempts() >= maxLoginAttempts) {
            user.setLockedUntil(LocalDateTime.now().plusMinutes(lockDurationMinutes));
            log.warn("Account locked for user: {}", user.getUsername());
        }
        
        userRepository.save(user);
        log.warn("Failed login attempt {} for user: {}", user.getLoginAttempts(), user.getUsername());
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
    
    public TokenRefreshResponse refreshToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        
        // Validate refresh token
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new UnauthorizedException("Invalid refresh token");
        }
        
        String userId = jwtTokenProvider.getUserIdFromToken(refreshToken);
        UUID uuid = UUID.fromString(userId);
        
        User user = userRepository.findById(uuid)
                .orElseThrow(() -> new UnauthorizedException("User not found"));
        
        // Check if refresh token matches and is not expired
        if (!refreshToken.equals(user.getRefreshToken()) || 
            user.getRefreshTokenExpiry() == null ||
            user.getRefreshTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new UnauthorizedException("Refresh token expired or invalid");
        }
        
        // Generate new tokens
        String newAccessToken = jwtTokenProvider.generateToken(user.getId().toString(), user.getUsername());
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(user.getId().toString(), user.getUsername());
        
        // Update refresh token in database
        user.setRefreshToken(newRefreshToken);
        user.setRefreshTokenExpiry(LocalDateTime.now().plusDays(30));
        userRepository.save(user);
        
        log.info("Token refreshed for user: {}", user.getUsername());
        
        return new TokenRefreshResponse(newAccessToken, newRefreshToken);
    }
    
    public void changePassword(String token, ChangePasswordRequest request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        
        String userId = jwtTokenProvider.getUserIdFromToken(token);
        UUID uuid = UUID.fromString(userId);
        
        User user = userRepository.findById(uuid)
                .orElseThrow(() -> new UnauthorizedException("User not found"));
        
        // Verify current password
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Current password is incorrect");
        }
        
        // Update password
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        
        log.info("Password changed for user: {}", user.getUsername());
    }
    
    public void forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email not found"));
        
        // Generate reset token
        String resetToken = UUID.randomUUID().toString();
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1)); // 1 hour expiry
        userRepository.save(user);
        
        // TODO: Send password reset email with token
        log.info("Password reset requested for user: {}", user.getUsername());
    }
    
    public void resetPassword(ResetPasswordRequest request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        
        User user = userRepository.findByResetToken(request.getToken())
                .orElseThrow(() -> new IllegalArgumentException("Invalid reset token"));
        
        // Check token expiry
        if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Reset token has expired");
        }
        
        // Update password
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        
        log.info("Password reset successfully for user: {}", user.getUsername());
    }
    
    public void verifyEmail(VerifyEmailRequest request) {
        User user = userRepository.findByVerificationToken(request.getToken())
                .orElseThrow(() -> new IllegalArgumentException("Invalid verification token"));
        
        // Check token expiry
        if (user.getVerificationTokenExpiry() == null || 
            user.getVerificationTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Verification token has expired");
        }
        
        // Mark email as verified
        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setVerificationTokenExpiry(null);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        
        log.info("Email verified for user: {}", user.getUsername());
    }
    
    public void resendVerificationEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Email not found"));
        
        if (user.getEmailVerified()) {
            throw new IllegalArgumentException("Email already verified");
        }
        
        // Generate new verification token
        String verificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(verificationToken);
        user.setVerificationTokenExpiry(LocalDateTime.now().plusHours(24));
        userRepository.save(user);
        
        // TODO: Send verification email with new token
        log.info("Verification email resent for user: {}", user.getUsername());
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
