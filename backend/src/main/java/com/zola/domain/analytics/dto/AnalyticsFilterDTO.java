package com.zola.domain.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsFilterDTO {
    private String timeRange; // 7days, 30days, custom
    private String region;
    private String platform; // all, web, ios, android
    private LocalDate startDate;
    private LocalDate endDate;
}
