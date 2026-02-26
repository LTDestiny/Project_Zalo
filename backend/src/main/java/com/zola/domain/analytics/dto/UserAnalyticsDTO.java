package com.zola.domain.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAnalyticsDTO {
    private long newUsers;
    private double churnRate;
    private double avgEngagement;
    private long totalMessages;
    private double newUsersGrowth;
    private double churnGrowth;
    private List<ChartDataPointDTO> engagementTrend;
    private List<UserDataDTO> activeUsers;
}
