package com.ott.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest {
    
    @Size(min = 2, max = 100, message = "Display name must be between 2 and 100 characters")
    private String displayName;
    
    @Email(message = "Email should be valid")
    private String email;
    
    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    private String phoneNumber;
    
    @Size(max = 500, message = "Bio cannot exceed 500 characters")
    private String bio;
    
    private String avatarUrl;
}
