package com.ott.domain.user.dto;

import com.ott.domain.common.enums.UserStatus;
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
    private LocalDateTime createdAt;
    private LocalDateTime lastSeen;
}
