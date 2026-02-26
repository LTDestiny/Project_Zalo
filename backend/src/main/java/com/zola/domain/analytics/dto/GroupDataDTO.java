package com.zola.domain.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupDataDTO {
    private String id;
    private String name;
    private String category;
    private long members;
    private String activityLevel; // ultra-high, high, medium, low
    private String status;
    private String avatar;
    private String trend; // trending, steady, declining
}
