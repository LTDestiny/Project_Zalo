package com.zola.domain.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupAnalyticsDTO {
    private long totalGroups;
    private double monthlyGrowth;
    private double avgActivity;
    private List<CategoryStatsDTO> categoryBreakdown;
    private PrivacyStatsDTO privacyStats;
    private List<GroupDataDTO> activeGroups;
}
