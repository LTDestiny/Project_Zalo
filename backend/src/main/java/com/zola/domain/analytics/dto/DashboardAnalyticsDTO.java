package com.zola.domain.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardAnalyticsDTO {
    private long totalUsers;
    private long dau; // Daily Active Users
    private long messagesPerDay;
    private long activeGroups;
    private double userGrowth; // percentage
    private double dauGrowth;
    private double messageGrowth;
    private double groupGrowth;
}
