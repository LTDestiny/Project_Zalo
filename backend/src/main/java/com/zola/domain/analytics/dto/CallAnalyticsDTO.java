package com.zola.domain.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CallAnalyticsDTO {
    private long totalCallMinutes;
    private double successRate;
    private String avgDuration;
    private double callMinutesGrowth;
    private double successRateGrowth;
    private double durationGrowth;
    private List<PeakHourDataDTO> peakHours;
    private CallBreakdownDTO callBreakdown;
    private List<RegionDataDTO> topRegions;
}
