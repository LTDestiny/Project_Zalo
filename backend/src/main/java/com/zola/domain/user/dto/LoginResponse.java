package com.zola.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    private String token;
    private String tokenType = "Bearer";
    private UserDto user;
    
    public LoginResponse(String token, UserDto user) {
        this.token = token;
        this.user = user;
        this.tokenType = "Bearer";
    }
}
