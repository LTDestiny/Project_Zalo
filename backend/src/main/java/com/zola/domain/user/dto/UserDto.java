package com.zola.domain.user.dto;

import com.zola.domain.common.enums.UserRole;
import com.zola.domain.common.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private UUID id;
    private String username;
    private String email;
    private String phoneNumber;
    private String avatarUrl;
    private UserStatus status;
    private UserRole role;
    private LocalDateTime createdAt;
    private LocalDateTime lastSeen;
}
