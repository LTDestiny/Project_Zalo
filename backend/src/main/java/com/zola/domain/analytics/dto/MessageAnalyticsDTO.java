package com.zola.domain.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageAnalyticsDTO {
    private long totalMessages;
    private long activeGroups;
    private double responseRate;
    private long dailyAvg;
    private List<ChartDataPointDTO> volumeTrend;
    private List<MessageTypeBreakdownDTO> messageTypes;
    private SentimentStatsDTO sentimentBreakdown;
    private List<HourlyStatsDTO> peakActivityHours;
}
