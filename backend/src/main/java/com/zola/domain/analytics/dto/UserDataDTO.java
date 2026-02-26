package com.zola.domain.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDataDTO {
    private String id;
    private String name;
    private String email;
    private String status; // active, idle, inactive
    private String platform;
    private String lastActive;
    private double engagementScore;
    private String avatar;
}
